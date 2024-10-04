// profile.component.ts

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  private isBrowser: boolean;


  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      const token = currentUser ? currentUser.token : null;
  
      if (token) {
        const trimmedToken = token.trim(); // Remove any potential whitespace
        console.log(`${trimmedToken}`);
        this.authService.getProfile(`Bearer ${trimmedToken}`).subscribe({
          next: (response) => {
            this.user = response;
            console.log(response)
        },
          error: (error) => console.error('There was an error!', error)
        });
      }
    }
  }
  // profile.component.ts
saveChanges(): void {
  if (this.isBrowser) {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const token = currentUser ? currentUser.token : null;
  
  if (this.user) {
      this.authService.updateProfile(this.user, token).subscribe({
          next: (response) => {
              console.log('Profile successfully updated', response);
              
              this.router.navigate(['/profile']);
              // Additional actions after successful update, like a notification or redirect
          },
          error: (error) => {
              console.error('Failed to update profile:', error);
          }
      });
  }
}
}

  
}
