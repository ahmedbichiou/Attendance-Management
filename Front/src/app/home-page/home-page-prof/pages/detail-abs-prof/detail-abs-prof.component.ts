import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionCours } from '../../../../models/SessionCours';
import { Absence } from '../../../../models/Absence';
import { SessionCoursService } from '../../../../services/session-cours.service';
import { EtudiantService } from '../../../../services/etudiant.service';
import { Etudiant } from '../../../../models/Etudiant';
import { AbsenceService } from '../../../../services/absence.service'; // Import AbsenceService

@Component({
  selector: 'app-detail-abs-prof',
  templateUrl: './detail-abs-prof.component.html',
  styleUrls: ['./detail-abs-prof.component.scss']
})
export class DetailAbsProfComponent implements OnInit {
  etudiantId: number | null = null;
  cours: string | null = null;
  sessions: SessionCours[] = []; // Array to hold sessions
  filteredSessions: SessionCours[] = [];
  filteredList2: Absence[] = [];
  student: Etudiant | null = null; 

  constructor(
    private route: ActivatedRoute,
    private sessionCoursService: SessionCoursService,
    private etudiantService: EtudiantService,
    private absenceService: AbsenceService // Inject AbsenceService
  ) { }

  ngOnInit(): void {
    // Subscribe to the query parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the values of etudiantId and cours from the queryParams object
      this.etudiantId = params['etudiantId'] ? +params['etudiantId'] : null;
      this.cours = params['cours'] || null;

      // Log the received parameters
      console.log('Etudiant ID:', this.etudiantId);
      console.log('Cours:', this.cours);
      if (this.etudiantId != null) {
        this.loadStudentDetails(this.etudiantId);
      }
          setTimeout(() => {
            if(this.student !=null)
             this.filteredList2= this.getAbsencesCount(this.student);
          }, 100);
          console.log(this.filteredList2);
     // Adjust the delay as needed
    });
  }

  loadStudentDetails(etudiantId: number): void {
    this.etudiantService.getEtudiantById(etudiantId).subscribe(
      (student: Etudiant) => {
        this.student = student;
      },
      (error: any) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
  getAbsencesCount(student: Etudiant): Absence[] {
    console.log(student);
    const filteredList2: Absence[] = [];
   student.absences.forEach(Absence => {
    if(Absence.session.nomCours== this.cours && Absence.idEtud == student.idEtud)
      {
        
        filteredList2.push(Absence);
      }
    });
    console.log(filteredList2);
    return filteredList2;
  }

  deleteAbsence(id: number): void {
    this.absenceService.deleteAbsence(id).subscribe(
      () => {
        // If deletion is successful, remove the absence from the filteredList2 array
        this.filteredList2 = this.filteredList2.filter(absence => absence.idAbsence !== id);
      },
      (error: any) => {
        console.error('Error deleting absence:', error);
      }
    );
  }
}
