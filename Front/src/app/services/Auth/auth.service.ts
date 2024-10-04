import { RegisterRequest } from './../../models/RegisterRequest';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../models/User';
import { LoginRequest } from '../../models/LoginRequest';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';
  private currentUserSubject: BehaviorSubject<LoginRequest | null>;
  public currentUser: Observable<LoginRequest | null>;
  private isBrowser: boolean; // Flag to check if the platform is a browser

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in the browser
    // Parse the current user from localStorage if available, or set to null if not
    const storedUser = this.isBrowser ? localStorage.getItem('currentUser') : null;
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<LoginRequest | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginRequest | null {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, { username, password }, {
      responseType: 'text' as 'json' // Tells HttpClient to handle the response as text
    })
    .pipe(
      map(token => {
        if (token && this.isBrowser) {
          // Now 'token' is just a string, so no need to access response.token
          localStorage.setItem('currentUser', JSON.stringify({ username, token }));
          // Here, the 'token' is a string, and 'username' is from the login parameters
          // Assuming 'LoginRequest' can accept this object structure
          this.currentUserSubject.next({ username, token } as unknown as LoginRequest);
        }
        // Just return the token for now, adjust as needed
        return token;
      }),
      catchError((error: any) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }
  signUp(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/auth/signup`, registerRequest, {
      responseType: 'text' as 'json' 
    });
  }

  getProfile(token: string): Observable<User> {
    const headers = { 'Authorization': `${token}` };
    console.log('Sending token:', headers.Authorization); // Add this line for debugging
    return this.http.get<User>(`${this.apiUrl}/auth/profile`, { headers });
  }

  forgetPassword(email: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new URLSearchParams();
    body.set('email', email);

    return this.http.post(`${this.apiUrl}/auth/requestReset`, body.toString(), {
      headers: headers,
      responseType: 'text' as 'text' // Properly telling TypeScript this is a text response
    });
  }

  // // password-reset.service.ts
  // resetPassword(token: string, newPassword: string): Observable<any> {
  // return this.http.post(`${this.apiUrl}/auth/resetPassword`, { token, newPassword });
  // }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const url = `${this.apiUrl}/auth/resetPassword?token=${token}`; // Include token in the query
    return this.http.post(url, { newPassword, confirmPassword });
}

  updateProfile(user: User, token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<any>(`${this.apiUrl}/auth/updateProfile/${user.idUser}`, user, { headers })
        .pipe(
            map(response => {
                // Assuming the new token is in the 'token' property of the response
                const newToken = response.token;
                if (newToken && this.isBrowser) {
                    // Update the token in localStorage
                    const currentUser = localStorage.getItem('currentUser');
                    if (currentUser) {
                        const currentUserObj = JSON.parse(currentUser);
                        currentUserObj.token = newToken;
                        localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
                        // Update the BehaviorSubject to reflect the new token
                        this.currentUserSubject.next({ username: currentUserObj.username, token: newToken } as unknown as LoginRequest);
                    }
                }
                return response;
            }),
            catchError((error: any) => {
                console.error('Update profile error:', error);
                return throwError(() => new Error(error.error.message || 'Failed to update profile'));
            })
        );
}


  

  logout(): void {
    // remove user from local storage to log user out, if in browser
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}
