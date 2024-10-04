import { EtudiantService } from './../../../../services/etudiant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Groupe } from '../../../../models/Groupe';
import { GroupeService } from '../../../../services/groupe.service';
import { SessionCours } from '../../../../models/SessionCours';
import { SessionCoursService } from '../../../../services/session-cours.service';
import { Absence } from '../../../../models/Absence';
import { Etudiant } from '../../../../models/Etudiant';
import { CoursService } from '../../../../services/cours.service';
import { Cours } from '../../../../models/Cours';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feuilleabsenceprof',
  templateUrl: './feuilleabsenceprof.component.html',
  styleUrls: ['./feuilleabsenceprof.component.css']
})
export class FeuilleabsenceprofComponent implements OnInit {
  groupe: string | null = null;
  professeurId: number | null = null;
  cours: string | null = null;
  COOOUR: Cours | null = null;
  group: Groupe | null = null;
  studentAbsenceMap: Map<string, number> = new Map();
  sessions: SessionCours[] = []; // Array to hold sessions
  filteredSessions: SessionCours[] = [];
  filteredList2: Absence[] = [];
  absencesAutorisees: number | null = null;

  constructor(
    private router: Router,
    private sessionCoursService: SessionCoursService,
    private route: ActivatedRoute,
    private groupeService: GroupeService,
    private coursService: CoursService,
    private httpClient: HttpClient,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupe = params['groupe'] || null;
      this.professeurId = params['professeurId'] ? +params['professeurId'] : null;
      this.cours = params['cours'] || null;
      if (this.groupe !== null) {
        this.loadGroupByName(this.groupe);
      }
      if (this.cours != null) {
        this.fetchCoursByNom(this.cours).subscribe((cours: Cours) => {
          this.COOOUR = cours;
          if (this.COOOUR != null) {
            this.absencesAutorisees = this.COOOUR.absencesAutorisees;
  
          }
        });
      }
    });
  }

  loadGroupByName(groupName: string): void {
    this.groupeService.getGroupeByNom(groupName).subscribe(
      (group: Groupe) => {
        this.group = group;
      },
      (error: any) => {
        console.error('Error fetching group:', error);
      }
    );
  }

  getAbsencesCount(student: Etudiant): number {
    const filteredList2: Absence[] = [];
    student.absences.forEach(Absence => {
      if (Absence.session.nomCours == this.cours && Absence.idEtud == student.idEtud) {
        filteredList2.push(Absence);
      }
    });
    return filteredList2.length;
  }

  // checkAndNotify(student: Etudiant): void {
  //   console.log("Entered")
  //   const absences = this.getAbsencesCount(student);
  //   if (this.absencesAutorisees!=null && absences > this.absencesAutorisees) {
  //     this.sendAbsenceNotification(student.idEtud); // Assuming `email` is a property of `Etudiant`
  //   }
  // }
  checkAndNotify(idEtudiant: number): void {
    console.log("Checking for student ID:", idEtudiant);
    this.getEtudiantById(idEtudiant).subscribe(student => {
        const absences = this.getAbsencesCount(student);
        if (this.absencesAutorisees != null && absences > this.absencesAutorisees+1) {
            this.sendEliminationNotification(idEtudiant);
        }
    }, error => {
        console.error('Failed to fetch student data', error);
    });
}

getEtudiantById(idEtudiant: number): Observable<Etudiant> {
    return this.etudiantService.getEtudiantById(idEtudiant);
}


// Modify the sendAbsenceNotification to pass student ID
sendAbsenceNotification(idEtud: number): void {
  this.httpClient.post('http://localhost:8081/notifierEtudiantAbs', { idEtud }).subscribe(
    response => {
      console.log('Notification sent successfully', response);
    },
    error => {
      console.error('Failed to send notification', error);
    }
  );
}
sendEliminationNotification(idEtud: number): void {
  this.httpClient.post('http://localhost:8081/notifierEtudiantElim', { idEtud }).subscribe(
    response => {
      console.log('Notification sent successfully', response);
    },
    error => {
      console.error('Failed to send notification', error);
    }
  );
}


  statuselimination(student: Etudiant): boolean {
    const num = this.getAbsencesCount(student);
    // this.checkAndNotify(student);
    if (this.cours != null && this.absencesAutorisees != null) {
      if (num < this.absencesAutorisees+1) {
        return true;
      } else {
        // this.checkAndNotify(student)
        return false;
      }
    }
    return false; // Return false if cours or COOOUR is null
  }

  fetchCoursByNom(nomCours: string): Observable<Cours> {
    return this.coursService.getCoursByNom(nomCours);
  }

  detailAbsence(etudiantId: number): void {
    // Navigate to the other component with etudiantId and cours as parameters
    this.router.navigate(['/detail-absence-prof'], {
      queryParams: {
        etudiantId: etudiantId,
        cours: this.cours
      }
    });
  }

  ajouterAbsence(etudiantId: number): void {
    // Navigate to the other component with etudiantId and cours as parameters
    this.router.navigate(['/ajouter-absence-prof'], {
      queryParams: {
        etudiantId: etudiantId,
        cours: this.cours
      }
    });
    this.sendAbsenceNotification(etudiantId);
    this.checkAndNotify(etudiantId)
  }
}
