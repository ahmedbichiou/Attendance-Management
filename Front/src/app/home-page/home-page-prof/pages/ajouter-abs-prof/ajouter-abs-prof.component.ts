import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsenceService } from '../../../../services/absence.service';
import { SessionCoursService } from '../../../../services/session-cours.service';
import { Absence } from '../../../../models/Absence'; // Assuming you have an Absence model
import { SessionCours } from '../../../../models/SessionCours'; // Assuming you have a SessionCours model
import { EtudiantService } from '../../../../services/etudiant.service';
import { Etudiant } from '../../../../models/Etudiant';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ajouter-abs-prof',
  templateUrl: './ajouter-abs-prof.component.html',
  styleUrls: ['./ajouter-abs-prof.component.scss']
})
export class AjouterAbsProfComponent implements OnInit {
  etudiantId: number | null = null;
  sessions: SessionCours[] = [];
  sessionForm: FormGroup;
  raisonOptions: string[] = ['Sickness', 'Personal reasons'];
  statusOptions: string[] = ['JUSTIFIEE', 'NON_JUSTIFIEE'];
  filteredSessions: SessionCours[] = [];
  cours: any;
  etudiant: Etudiant | null = null; 
  session:SessionCours | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private sessionCoursService: SessionCoursService,
    private etudiantService: EtudiantService,
    private location: Location
  ) {
    // Initialize the form
    this.sessionForm = this.formBuilder.group({
      etudiantId: [null, Validators.required],
      sessionId: [null, Validators.required], // Change to sessionId
      raison: [null, Validators.required],
      statut: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribe to the query parameters
    this.route.queryParams.subscribe(params => {
      this.etudiantId = params['etudiantId'] ? +params['etudiantId'] : null;
      this.cours = params['cours'] || null;
      if (this.etudiantId) {
        this.sessionForm.patchValue({ etudiantId: this.etudiantId });
      }
    });
    this.loadAllSessions();
    this.fetchStudentById();
    console.log(this.filteredSessions );
   
  }

  errorMessage: string = '';

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const formData = this.sessionForm.value;
      console.log(this.etudiant);
      this.fetchSessionById( formData.sessionId);
      setTimeout(() => {
       
     
      if(this.etudiant != null && this.session != null)
        {
          const absenceData: Absence = {
            etudiant: this.etudiant,
            raison: formData.raison,
            statut: formData.statut,
            session: this.session,
            idAbsence: 0,
            sessionId: null,
            idEtud: null
          };
          // Call the service to add absence
          this.absenceService.createAbsence(absenceData).subscribe(
            (response: any) => {
              console.log('Absence added successfully:', response);
              this.goBack();
            },
            (error: any) => {
              console.error('Error adding absence:', error);
              // Handle error - show error message to user
              this.errorMessage = 'Error adding absence. Please try again.';
            }
          );
        } else {
          // Form is invalid - set error message
          this.errorMessage = 'Please fill in all required fields.';
        } }, 100);
        }
     
  }

  loadAllSessions(): void {
    this.sessionCoursService.getAllSessionCours().subscribe(
      (sessions: SessionCours[]) => {
        this.sessions = sessions;
        this.filterSessionsByNomCours();
      },
      (error: any) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  filterSessionsByNomCours(): void {
    this.filteredSessions = this.sessions.filter(session => session.nomCours === this.cours);
  }

  fetchStudentById(): void {
    if(this.etudiantId != null)
    this.etudiantService.getEtudiantById(this.etudiantId)
      .subscribe(
        (etudiant: Etudiant) => {
          this.etudiant = etudiant;
          console.log('Fetched student:', etudiant);
        },
        (error) => {
          console.error('Error fetching student:', error);
        }
      );
  }
  fetchSessionById(sessionId : number): void {
    this.sessionCoursService.getSessionCoursById(sessionId)
      .subscribe(
        (session: SessionCours) => {
          this.session = session;
          console.log('Fetched session:', session);
        },
        (error) => {
          console.error('Error fetching session:', error);
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}
