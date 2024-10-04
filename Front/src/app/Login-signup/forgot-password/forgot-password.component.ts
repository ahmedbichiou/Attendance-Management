import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = "";
  errorMessage: string = "";
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.authService.forgetPassword(this.email).subscribe(
      data => {
        console.log('Un mail a été transmis à votre adresse e-mail pour réinitialiser votre mot de passe', data); // For debugging
        this.router.navigate(["/"]);  // Redirect to root upon successful email submission
      },
      error => {
        console.error('Sending email error', error); // For debugging
        this.errorMessage = error.error.message || 'Email not found'; // Adjust based on actual error structure
      }
    );
}

  

}
