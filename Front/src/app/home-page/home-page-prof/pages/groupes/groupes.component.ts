import { Component, Injectable } from '@angular/core';
import { Professeur } from '../../../../models/Professeur';
import { ProfesseurService } from '../../../../services/professeur.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ProfessorManageService} from '../../../../services/managment/professor-manage.service'
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent {
  professeurs: Professeur[] = [];
  groupes: string[] = [];
  isTableReady: boolean = false;
  profsseur : Professeur | null = null;



  idporfesseurADD : number =1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ProfessorManageService: ProfessorManageService,
    private professeurService: ProfesseurService
  ) {}

  ngOnInit(): void {
    
    
    this.profsseur = this.getProfesseur();

    // Wait for table data to appear before executing splitStringToArray
    setTimeout(() => {
      if(this.profsseur != null)
      this.idporfesseurADD = this.profsseur?.idProfesseur;
      this.splitStringToArray();
    }, 100); // Adjust the delay as needed
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
    return professor !== undefined ? professor : null;
  }
  
  splitStringToArray(): void {

   if(this.profsseur != null)
    this.groupes = this.profsseur.groupes.split(',');
    
  }
  
  // Function to navigate to a new page with the selected group name and professeur id
  goToGroupPage(groupe: string, professeurId: number): void {
    this.router.navigate(['/matiers-prof'], {
      queryParams: {
        groupe: groupe,
        professeurId: professeurId
      }
    });
  }
}
