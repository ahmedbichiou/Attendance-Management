import { Component } from '@angular/core';
import { Etudiant } from '../models/Etudiant';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-etudiants-form',
  templateUrl: './etudiants-form.component.html',
  styleUrls: ['./etudiants-form.component.scss']
})
export class EtudiantsFormComponent {
  //etudiant: Etudiant = new Etudiant(0, 0, '', '', '', ''); // Initialize with default values or leave blank

  constructor(private etudiantService: EtudiantService) { }

  onSubmit() {
    /*this.etudiantService.createEtudiant(this.etudiant).subscribe(
      (response) => {
        console.log('Etudiant created successfully:', response);
        // Reset the form or handle success message
      },
      (error) => {
        console.error('Error creating etudiant:', error);
        // Handle error message or display error to user
      }
    );*/
  }
}
