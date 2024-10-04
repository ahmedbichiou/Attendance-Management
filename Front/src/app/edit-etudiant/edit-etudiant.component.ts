import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../models/Etudiant';

@Component({
  selector: 'app-edit-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.scss']
})
export class EditEtudiantComponent implements OnInit {
  etudiant: Etudiant | undefined;
  

  constructor(private route: ActivatedRoute, private router: Router, private etudiantService: EtudiantService) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      const studentId = params.get('id');
      console.log('Student ID:', studentId); 

      if (studentId) {

        const parsedStudentId = parseInt(studentId, 10);
        this.etudiantService.getEtudiantById(parsedStudentId).subscribe(
          (data: Etudiant) => {
            this.etudiant = data;
            console.log(this.etudiant);
          },
          (error) => {
            console.error('Error fetching etudiant:', error);
          }
        );
    }
  });
  }

  onSubmit(): void {
    // Check if etudiant is null or undefined before proceeding
    if (this.etudiant) {
      console.log(this.etudiant);
      // Implement logic to save changes to the etudiant
      this.etudiantService.updateEtudiant(this.etudiant.idEtud, this.etudiant).subscribe(
        () => {
          console.log('Etudiant updated successfully!');
          // Redirect to the etudiant details page or any other desired route
          // this.router.navigate(['/etudiant-details', this.etudiant.idEtud]);
        },
        (error) => {
          console.error('Error updating etudiant:', error);
        }
      );
    } else {
      console.error('Etudiant object is null or undefined.');
    }
  }
}

  

  
