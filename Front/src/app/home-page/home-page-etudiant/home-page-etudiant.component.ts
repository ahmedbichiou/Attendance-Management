import { Component, Injectable, OnInit } from '@angular/core';
import { EtudiantService } from '../../services/etudiant.service'
import { GroupeService } from '../../services/groupe.service';
import { Etudiant } from '../../models/Etudiant';
import { Groupe } from '../../models/Groupe';
import { Cours } from '../../models/Cours';
import { Absence } from '../../models/Absence';
import { Router } from '@angular/router';
import {EtudiantManageService} from '../../services/managment/etudiant-manage.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home-page-etudiant',
  templateUrl: './home-page-etudiant.component.html',
  styleUrls: ['./home-page-etudiant.component.css']
})
export class HomePageEtudiantComponent implements OnInit {
  etudiant: Etudiant | null = null;
  group: Groupe | null = null;
  coursList: Cours[] = [];

//ID itudiant a completer avec token 

idEtud : number = 1;
//ID itudiant a completer avec token 


  constructor(
    private router: Router,
    private etudiantService: EtudiantService,
    private groupeService: GroupeService,
    private EtudiantManageService: EtudiantManageService,
  ) {}

  ngOnInit(): void {
    // Assume X is the ID of the etudiant you want to retrieve
   
    console.log(this.etudiant);
    setTimeout(() => {
      this.etudiant = this. getCurrentEtudiant();
      if(this.etudiant != null )
      this.idEtud = this.etudiant.idEtud;
    
  }, 200);
    console.log(this.etudiant);
    setTimeout(() => {
    if(this.etudiant != null)
    this.fetchGroupeByNom(this.etudiant.nomGroupe);
    
  }, 300); // Adjust the delay as needed
    /*
    setTimeout(() => {
      if(this.profsseur != null)
      this.idporfesseurADD = this.profsseur?.idProfesseur;
      this.splitStringToArray();
    }, 100); // Adjust the delay as needed
   // this.fetchEtudiantById(this.idEtud);*/
  }

  fetchEtudiantById(id: number): void {
    this.etudiantService.getEtudiantById(id).subscribe(
      (etudiant: Etudiant) => {
        
        this.etudiant = etudiant;
        if (this.etudiant.nomGroupe) {
          
          this.fetchGroupeByNom(etudiant.nomGroupe);
        }
      },
      (error: any) => {
        console.error('Error fetching etudiant:', error);
        // Handle error - show error message to user
      }
    );
  }

  fetchGroupeByNom(nom: string): void {
    this.groupeService.getGroupeByNom(nom).subscribe(
      (group: Groupe) => {
        this.group = group;
      
        this.coursList = group.cours; // Assign the coursList to the courses of the group
      },
      (error: any) => {
        console.error('Error fetching groupe:', error);
        // Handle error - show error message to user
      }
    );
  }
  getCurrentEtudiant(): Etudiant | null {
    const professor = this.EtudiantManageService.getCurrentEtudiant();
    return professor !== undefined ? professor : null;
  }


  getAbsencesCount(cours: Cours): number {
    const filteredList2: Absence[] = [];
    if(this.etudiant != null)
    this.etudiant.absences.forEach(Absence => {
      if(this.etudiant != null)
      if (Absence.session.nomCours == cours.nomCours && Absence.idEtud == this.etudiant.idEtud) {
    
        filteredList2.push(Absence);
      }
    });
    return filteredList2.length;
  }
  viewSessions(cours: Cours): void {
    this.router.navigate(['/session-list-etud', cours.nomCours]);

    
  }

  goToabsPage(cours: Cours): void {
    this.router.navigate(['/abs-list-etud'], {
      queryParams: {
       cours: cours.nomCours,
        idEtud : this.idEtud 
      }
    });
  }
}
