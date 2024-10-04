import { EtudiantService } from './../../services/etudiant.service';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../models/Etudiant';
import { GroupeService } from '../../services/groupe.service';
import { Groupe } from '../../models/Groupe';
import { Router } from '@angular/router';
import { Cours } from '../../models/Cours';

@Component({
  selector: 'app-etudiants-par-groupe',
  templateUrl: './etudiants-par-groupe.component.html',
  styleUrl: './etudiants-par-groupe.component.scss'
})
export class EtudiantsParGroupeComponent implements OnInit {
  etudiants: Etudiant[] = [];
  selectedGroupe: Groupe = new Groupe('', [], []);
  selectedEtudiant: Etudiant | null = null;
  selectedCours: Cours | null = null;

  constructor(private groupeService: GroupeService, private etudiantService: EtudiantService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.selectedGroupe=this.groupeService.selectedGroupe;
    /* const state = history.state as { selectedGroup: Groupe };
  if (state && state.selectedGroup) {
    this.selectedGroupe = state.selectedGroup;
  } else {
    console.error('No group selected.');
  } */
  }

  getAllStudents(): void {
    this.groupeService.getStudentsByGroup(this.groupeService.selectedGroupe.nom).subscribe(
      (students) => {
        this.etudiants = students;
        console.log('Students:', students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }


  saveSelectedEtudiant(etudiant: Etudiant): void {
    //this.selectedEtudiant = etudiant;
    //console.log('Selected etudiant:', etudiant);
    //this.router.navigate(['./selectedEtudiant']);
    this.router.navigate(['./selectedEtudiant'], { state: { selectedEtudiant: etudiant } });
  }

  navigateTo(route: string): void {
    // Navigate to the specified route
    // Implement this method based on your router implementation
  }

  editEtudiant(etudiant: Etudiant): void {
    this.router.navigate(['./editEtud'], { state: { selectedEtudiant: etudiant } });
  }

  deleteEtudiant(etudiant: Etudiant): void {
    // Implement delete functionality if needed
  }

  /* editCours(cours: Cours): void {
    // Implement delete functionality if needed
  } */
  deleteCours(cours: Cours): void {
    // Implement delete functionality if needed
  }

  goBack(): void {
    this.router.navigate(['./groupes']);
  }

  saveSelectedCours(cours: Cours): void {
    this.selectedCours = cours;
    if (this.selectedCours) {
      this.router.navigate(['./profCoursGroup'], { state: { selectedCours: this.selectedCours } });
    } else {
      console.error('No course selected.');
    }
  }
}