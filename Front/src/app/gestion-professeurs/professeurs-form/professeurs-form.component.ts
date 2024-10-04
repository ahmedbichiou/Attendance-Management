import { Component } from '@angular/core';
import { ProfesseurService } from '../../services/professeur.service';
import { Professeur } from '../../models/Professeur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professeurs-form',
  templateUrl: './professeurs-form.component.html',
  styleUrls: ['./professeurs-form.component.scss']
})
export class ProfesseursFormComponent {
  professeur: Professeur = new Professeur(0, 0, '', '', '',''); // Initialize with default values or leave blank

  constructor(private professeurService: ProfesseurService, private router: Router) { }
  navigateTo(route: string) {
    this.router.navigate([route]);
}

  onSubmit() {
    this.professeurService.createProfesseur(this.professeur).subscribe(
      (response) => {
        console.log('Professeur created successfully:', response);
        // Reset the form or handle success message
      },
      (error) => {
        console.error('Error creating professeur:', error);
        // Handle error message or display error to user
      }
    );
    this.router.navigate(['./listProfAcc']); 
  }

  goBack() {
    this.router.navigate(['./listProfAcc']); // Replace '/' with the route you want to navigate back to
  }
}

