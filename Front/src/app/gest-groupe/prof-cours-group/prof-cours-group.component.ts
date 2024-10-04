import { CoursService } from './../../services/cours.service';
import { Component, OnInit } from '@angular/core';
import { Cours } from '../../models/Cours';
import { ActivatedRoute, Router } from '@angular/router';
import { Professeur } from '../../models/Professeur';
import { SessionCours } from '../../models/SessionCours';

@Component({
  selector: 'app-prof-cours-group',
  templateUrl: './prof-cours-group.component.html',
  styleUrl: './prof-cours-group.component.scss'
})
export class ProfCoursGroupComponent implements OnInit {
  selectedCours: Cours | null = null;
  selectedProfesseur: Professeur | null = null;
  selectedCoursSessions: SessionCours[] = [];
  
  constructor(private coursService: CoursService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // Retrieve the selected course from state parameter
    const state = history.state;
    if (state && state.selectedCours) {
      this.selectedCours = state.selectedCours;
      if (this.selectedCours) {
      // Call the service method to get the professor by course name
      this.coursService.getProfesseurByNomCours(this.selectedCours.nomCours).subscribe(
        (professeur) => {
          this.selectedProfesseur = professeur;
          console.log('Selected professor:', professeur);
        },
        (error) => {
          console.error('Error fetching professor:', error);
        }
      );
      this.coursService.getSessionCoursByNomCours(this.selectedCours.nomCours).subscribe(
        (sessions) => {
          this.selectedCoursSessions = sessions;
          console.log('Selected course sessions:', sessions);
        },
        (error) => {
          console.error('Error fetching course sessions:', error);
        }
      );
    }
    } else {
      console.error('No course selected.');
    }
  }

  goBack(): void {
    this.router.navigate(['./etudiantsParGroupe']);
  }
}
