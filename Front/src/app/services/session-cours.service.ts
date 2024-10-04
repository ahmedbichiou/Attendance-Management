import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionCours } from '../models/SessionCours';

@Injectable({
  providedIn: 'root'
})
export class SessionCoursService {

  private apiUrl = 'http://localhost:8081/sessionCours';

  constructor(private http: HttpClient) { }

  getAllSessionCours(): Observable<SessionCours[]> {
    return this.http.get<SessionCours[]>(`${this.apiUrl}`);
  }

  getSessionCoursById(id: number): Observable<SessionCours> {
    return this.http.get<SessionCours>(`${this.apiUrl}/${id}`);
  }

  createSessionCours(sessionCours: SessionCours): Observable<SessionCours> {
    return this.http.post<SessionCours>(`${this.apiUrl}`, sessionCours);
  }

  updateSessionCours(id: number, sessionCours: SessionCours): Observable<SessionCours> {
    return this.http.put<SessionCours>(`${this.apiUrl}/${id}`, sessionCours);
  }

  deleteSessionCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
