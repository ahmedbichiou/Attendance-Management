import { Component, OnInit } from '@angular/core';
import { Cours } from '../../models/Cours';
import { CoursService } from '../../services/cours.service';
import { SessionCours } from '../../models/SessionCours';
import { Router } from '@angular/router';
import { SessionCoursService } from '../../services/session-cours.service';

@Component({
  selector: 'app-cours-sessions',
  templateUrl: './cours-sessions.component.html',
  styleUrl: './cours-sessions.component.scss'
})
export class CoursSessionsComponent implements OnInit {
  selectedCoursForSession: Cours | null = null;
  sessionCoursList: SessionCours[] = [];

  constructor(
    private coursService: CoursService,
    private router: Router,
    private sessionCoursService: SessionCoursService
  ) { }
  
  ngOnInit(): void {
    const state = history.state as { selectedCoursForSession: Cours }; // Use 'selectedCoursForSession'
    if (state && state.selectedCoursForSession) {
      this.selectedCoursForSession = state.selectedCoursForSession;
      this.getSessionCoursByNomCours(this.selectedCoursForSession.nomCours);
    } else {
      console.error('No course selected.');
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
}

  getSessionCoursByNomCours(nomCours: string): void {
    this.coursService.getSessionCoursByNomCours(nomCours).subscribe(
      (sessionCours) => {
        this.sessionCoursList = sessionCours;
      },
      (error) => {
        console.error('Error fetching sessionCours:', error);
      }
    );
  }

  navigateToAddSession(): void {
    if (this.selectedCoursForSession) {
      this.router.navigate(['./createSessionForMatiere'], { state: { selectedCoursForSession: this.selectedCoursForSession } });
    } else {
      console.error('No course selected.');
    }
  }

 

  deleteCourseSession(session: SessionCours): void {
     if (!session) {
      console.error('No session provided.');
      return;
    }

    const sessionId = session.idSession;
    if (!sessionId) {
      console.error('Session ID not found.');
      return;
    }

    this.sessionCoursService.deleteSessionCours(sessionId).subscribe(
      () => {
        // Filter out the deleted session from the sessionCoursList
        this.sessionCoursList = this.sessionCoursList.filter(s => s.idSession !== sessionId);
        console.log('Session deleted successfully.');
      },
      (error) => {
        console.error('Error deleting session:', error);
      }
    );
  }
  

  goBack() {
    this.router.navigate(['./matieres']); 
  }
}
