import { Component, Injectable, OnInit } from '@angular/core';
import { Groupe } from '../../../../models/Groupe';
import { GroupeService } from '../../../../services/groupe.service';
import { Etudiant } from '../../../../models/Etudiant';
import { ProfesseurService } from '../../../../services/professeur.service';
import { Professeur } from '../../../../models/Professeur';
import {ProfessorManageService} from '../../../../services/managment/professor-manage.service'
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-toutsetudiants',
  templateUrl: './toutsetudiants.component.html',
  styleUrls: ['./toutsetudiants.component.css']
})
export class ToutsetudiantsComponent implements OnInit {
  groupes1: Groupe[] = [];
  professeurs: Professeur[] = [];
  groupes2: string[] = [];
  commonGroupes: string[] = [];
  isTableReady: boolean = false;
  etudiantsByGroup: { [key: string]: Etudiant[] } = {};

  //-------------------------------------------------------------------------------id prof
  profsseur : Professeur | null = null;
  idporfesseurADD : number = 1;
//-------------------------------------------------------------------------------id prof
  constructor(private groupeService: GroupeService, private professeurService: ProfesseurService, private ProfessorManageService: ProfessorManageService,) {}

  ngOnInit(): void {
    this.profsseur = this.getProfesseur();

    //this.getProfesseurs();
    // Wait for table data to appear before executing splitStringToArray
    setTimeout(() => {
      this.splitStringToArray();
      this.loadGroupes();
    }, 100);
  }

  getProfesseurs(): void {
    this.professeurService.getAllProfesseurs()
      .subscribe((professeurs: Professeur[]) => {
        this.professeurs = professeurs;
        // Set table ready flag to true
        this.isTableReady = true;
      });
  }


  getProfesseur(): Professeur | null {
    const professor = this.ProfessorManageService.getCurrentProfessor();
    console.log(professor);
    return professor !== undefined ? professor : null;
  }


  splitStringToArray(): void {

    if(this.profsseur != null)
     this.groupes2 = this.profsseur.groupes.split(',');
     
   }

  filterCommonGroupes(): void {
    // Filter out common group names between groupes1 and groupes2
    this.commonGroupes = this.groupes1.map(g => g.nom).filter(g => this.groupes2.includes(g));
  }

  loadGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(
      (groupes: Groupe[]) => {
        this.groupes1 = groupes;
        // Initialize the etudiantsByGroup object
        this.groupes1.forEach((groupe: Groupe) => {
          this.etudiantsByGroup[groupe.nom] = [];
        });
        // Retrieve the list of students for each group
        this.groupes1.forEach((groupe: Groupe) => {
          this.loadEtudiantsByGroup(groupe.nom);
        });
        // Filter common groupes after loading groupes1
        this.filterCommonGroupes();
      },
      (error: any) => {
        console.error('Error fetching groupes:', error);
      }
    );
  }

  loadEtudiantsByGroup(nom: string): void {
    this.groupeService.getGroupeByNom(nom).subscribe(
      (groupe: Groupe) => {
        this.etudiantsByGroup[nom] = groupe.etudiants;
      },
      (error: any) => {
        console.error(`Error fetching etudiants for group ${nom}:`, error);
      }
    );
  }
}
