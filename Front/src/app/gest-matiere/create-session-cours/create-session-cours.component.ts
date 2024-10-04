import { Component, OnInit } from '@angular/core';
import { SessionCours } from '../../models/SessionCours';
import { Cours } from '../../models/Cours';
import { SessionCoursService } from '../../services/session-cours.service';
import { Router } from '@angular/router';
import { Groupe } from '../../models/Groupe';
import { GroupeService } from '../../services/groupe.service';

@Component({
  selector: 'app-create-session-cours',
  templateUrl: './create-session-cours.component.html',
  styleUrl: './create-session-cours.component.scss'
})
export class CreateSessionCoursComponent implements OnInit {
  groups: Groupe[] = []; // Array to store group names
  selectedGroupName: string = '';
  selectedCoursName: string = '';
  sessionCours: SessionCours = new SessionCours(0, new Cours('', '', new Groupe('', [], []), 0, [], 0), [], new Date(), '');

  constructor(private sessionCoursService: SessionCoursService,
              private groupService: GroupeService,
              private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of groups when the component initializes
    const state = history.state as { selectedCoursForSession: Cours };
  if (state && state.selectedCoursForSession) {
    this.selectedCoursName = state.selectedCoursForSession.nomCours; // Set the selected group name
  } else {
    console.error('No course selected.');
  }
    this.loadGroups();
  }

  onSubmit(): void {
    this.sessionCours.cours.nomCours=this.selectedCoursName;
    this.sessionCours.cours.group.nom=this.selectedGroupName;
    console.log(this.sessionCours);
    this.sessionCoursService.createSessionCours(this.sessionCours).subscribe(
      (createdSessionCours) => {
        console.log('SessionCours created successfully:', createdSessionCours);
        this.router.navigate(['./matieres']);
      },
      (error) => {
        console.error('Error creating sessionCours:', error);
      }
    );
  }

  loadGroups(): void {
    this.groupService.getAllGroupes().subscribe(
      (data) => {
        this.groups = data;
      },
      (error) => {
        console.error('Error loading groups:', error);
      }
    );
  }
}
