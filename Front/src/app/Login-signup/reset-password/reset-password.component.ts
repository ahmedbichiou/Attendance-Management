// src/app/reset-password/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  message: string = "";

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,  // Inject ActivatedRoute
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the token from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Get the token from the query parameter
      console.log(this.token);
    });
  }

  resetPassword() {
    console.log('resetPassword called'); // Debug log
    if (this.token) {
      this.authService.resetPassword(this.token, this.newPassword, this.confirmPassword)
        .subscribe({
          next: (response) => {
            this.message = 'Password successfully updated.';
            this.router.navigate(['']); 
          },
          error: (error) => {
            this.message = error.error;
          }
        });
    } else {
      this.message = 'Token is missing.';
    }
    this.router.navigate(['']); 
  }
  
}
