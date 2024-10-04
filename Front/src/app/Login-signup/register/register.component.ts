import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/Role';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  username: string ="";
  password: string="";
  email: string="";
  role: Role | any;
  nom: string="";
  prenom: string="";
  numeroTel: string="";
  departement: string="";
  errorMessage: string="";

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // Check if there's a user logged in when this component initializes
    if (this.authService.currentUserValue) {
      this.router.navigate(['/matieres']);  // Redirect to '/matieres' if a user is logged in
    }
  }
  register() {
    const signUpRequest = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
      nom: this.nom,
      prenom: this.prenom,
      numeroTel: this.numeroTel,
      departement: this.departement
      // Add other necessary fields
    };
    
    this.authService.signUp(signUpRequest).subscribe(
      (response) => {
        console.log(response); // Handle the response, such as navigating to a login page or showing a success message
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error; // Set the error message if there's an error
        console.error('There was an error during the registration process', error);
      }
    );
  }
}

