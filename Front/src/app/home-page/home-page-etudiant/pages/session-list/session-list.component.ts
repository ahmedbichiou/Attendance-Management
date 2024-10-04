import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionCours } from '../../../../models/SessionCours';
import { SessionCoursService } from '../../../../services/session-cours.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {
  cours: string | null = null;
  sessions: SessionCours[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private sessionCoursService: SessionCoursService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cours = params.get('cours');
      setTimeout(() => {
        console.log(this.cours);
      this.loadSessions();
      }, 100);
     
    });
  }

  loadSessions(): void {
    if (this.cours) {
      this.sessionCoursService.getAllSessionCours().subscribe(
        (sessions: SessionCours[]) => {
          this.sessions = sessions.filter(session => session.nomCours === this.cours);
        },
        (error: any) => {
          console.error('Error fetching sessions:', error);
        }
      );
    }
  }
}