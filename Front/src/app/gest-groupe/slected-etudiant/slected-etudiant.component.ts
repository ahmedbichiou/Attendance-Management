import { Component, OnInit } from '@angular/core';
import { Absence } from '../../models/Absence';
import { Etudiant } from '../../models/Etudiant';
import { EtudiantService } from '../../services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from '../../services/absence.service';
import { Cours } from '../../models/Cours';
import { CoursService } from '../../services/cours.service';
import { SessionCours } from '../../models/SessionCours';

@Component({
  selector: 'app-slected-etudiant',
  templateUrl: './slected-etudiant.component.html',
  styleUrl: './slected-etudiant.component.scss'
})
export class SlectedEtudiantComponent implements OnInit {
  absences: Absence[] = [];
  selectedEtudiant: Etudiant | null = null;

  constructor(private etudiantService: EtudiantService, 
              private absenceService : AbsenceService, 
              private coursService: CoursService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    //this.selectedEtudiant = this.etudiantService.selectedEtudiant;
    this.route.paramMap.subscribe(params => {
      const state = history.state;
    if (state && state.selectedEtudiant) {
      this.selectedEtudiant = state.selectedEtudiant;
      console.log(this.selectedEtudiant);
    }
    });

    if (this.selectedEtudiant) {
      this.getAbsencesByEtudiantId(this.selectedEtudiant);
    }
  }

  getAbsencesByEtudiantId(etudiant: Etudiant): void {
    this.absences = []; // Clear existing absences
    // Assuming the service method is named getAbsencesByEtudiant or similar
    this.absenceService.getAbsencesByEtudiantId(etudiant.idEtud).subscribe(
      (absences) => {
        this.absences = absences;
        console.log('Absences:', absences);
      },
      (error) => {
        console.error('Error fetching absences:', error);
      }
    );
  }

  /* getCoursNameForSession(sessionId: number): string {
    let coursName = 'N/A';
    this.coursService.getCoursBySessionId(sessionId).subscribe(
      (cours: Cours) => {
        if (cours) {
          coursName = cours.nomCours;
          console.log(coursName);
        }
      },
      (error) => {
        console.error('Error fetching cours:', error);
      }
    );
    return coursName;
  }
 */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  editAbsence(absence: Absence): void {
    // Implement edit functionality if needed
  }

  deleteAbsence(absence: Absence): void {
    // Implement delete functionality if needed
  }

  goBack(): void {
    this.router.navigate(['/etudiantsParGroupe']); 
  }
}
