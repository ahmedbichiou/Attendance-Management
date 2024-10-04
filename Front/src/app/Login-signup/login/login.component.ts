// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if there's a user logged in when this component initializes
    if (this.authService.currentUserValue) {
      this.router.navigate(['/homePage']);  // Redirect to '/matieres' if a user is logged in
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        console.log('Login successful', data); // For debugging
        this.router.navigate(['/homePage']);  // Redirect to '/matieres' upon successful login
      },
      error => {
        console.error('Login error', error); // For debugging
        this.errorMessage = error.error.message || 'Username or password is incorrect';
      }
    );
  }
}
