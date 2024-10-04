import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../models/Cours';
import { Groupe } from '../../models/Groupe';
import { Router } from '@angular/router';
import { GroupeService } from '../../services/groupe.service';
import { SessionCours } from '../../models/SessionCours';
import { SessionCoursService } from '../../services/session-cours.service';
import { Professeur } from '../../models/Professeur';
import { ProfesseurService } from '../../services/professeur.service';

@Component({
  selector: 'app-create-cours',
  templateUrl: './create-cours.component.html',
  styleUrl: './create-cours.component.scss'
})
export class CreateCoursComponent implements OnInit{
  cours: Cours = new Cours('', '', new Groupe('', [], []), 0, [], 0);;
  groups: Groupe[] = [];
  selectedGroupName: string = '';
  sessionCours: SessionCours = new SessionCours(0, new Cours('', '', new Groupe('', [], []), 0, [], 0), [], new Date(), '');
  professeurs: Professeur[] = [];
  selectedProfesseurId: number | undefined;

  constructor(private coursService: CoursService,
              private groupeService : GroupeService,
              private sessionCoursService: SessionCoursService,
              private professeurService: ProfesseurService,
              private router: Router){
  }
  ngOnInit(): void {
    this.getAllGroups();
    this.getAllProfesseurs();
  }

  getAllGroups(): void {
    this.groupeService.getAllGroupes().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  getAllProfesseurs(): void {
    this.professeurService.getAllProfesseurs().subscribe(
      (professeurs) => {
        this.professeurs = professeurs;
      },
      (error) => {
        console.error('Error fetching professors:', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
}

onSubmit(): void {
  const selectedGroup = this.groups.find(group => group.nom === this.selectedGroupName);
  if (selectedGroup) {
    // Assign the selected group to the course
    this.cours.group = selectedGroup;
    console.log(this.cours);
    if (this.selectedProfesseurId !== undefined) {
      this.cours.idProfesseur = this.selectedProfesseurId;
    } else {
      console.error('Selected professor ID is undefined.');
      return; // Exit the function if selectedProfesseurId is undefined
    }

    // Set default values for dateHeure and salle if they are empty
    if (!this.sessionCours.dateHeure) {
      this.sessionCours.dateHeure = new Date();
    }
    if (!this.sessionCours.salle) {
      this.sessionCours.salle = 'Default Salle'; // Set your default salle value here
    }

    // Call the service method to create the course
    this.coursService.createCours(this.cours).subscribe(
      (createdCours) => {
        console.log('Cours created successfully:', createdCours);
        this.sessionCours.cours = createdCours;
        // Call the service method to create the sessionCours
        this.sessionCoursService.createSessionCours(this.sessionCours).subscribe(
          (createdSessionCours) => {
            console.log('SessionCours created successfully:', createdSessionCours);
            this.router.navigate(['./matieres']);
          },
          (error) => {
            console.error('Error creating sessionCours:', error);
          }
        );
      },
      (error) => {
        console.error('Error creating cours:', error);
      }
    );
  } else {
    console.error('Selected group not found.');
  }
}



}
