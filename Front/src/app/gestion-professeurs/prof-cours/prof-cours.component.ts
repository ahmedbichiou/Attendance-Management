import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';
import { Cours } from '../../models/Cours';
import { Professeur } from '../../models/Professeur';
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-prof-cours',
  templateUrl: './prof-cours.component.html',
  styleUrl: './prof-cours.component.scss'
})
export class ProfCoursComponent implements OnInit {
  coursList: Cours[] = [];
  selectedProfesseur: Professeur | undefined;
  
  constructor(private coursService: CoursService,
              private professeurService: ProfesseurService,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedProfesseur=this.professeurService.selectedProfesseur;
    this.loadProfCours();
  }

  loadProfCours(): void {
    if (this.selectedProfesseur) {
      this.coursService.getCoursByProfesseurId(this.selectedProfesseur.idProfesseur).subscribe(
        (coursList) => {
          this.coursList = coursList;
          console.log(coursList);
        },
        (error) => {
          console.error('Error fetching cours:', error);
        }
      );
    }
  }

  saveSelectedCours(cours: Cours): void {
    // Logic to save the selected course for further actions
  }

  editCours(cours: Cours): void {
    // Logic to edit the selected course
  }

  deleteCours(cours: Cours): void {
    this.coursService.deleteCours(cours.nomCours).subscribe(
      () => {
        // If deletion is successful, remove the course from the list
        this.coursList = this.coursList.filter(c => c !== cours);
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['./listProfAcc']);
  }



}