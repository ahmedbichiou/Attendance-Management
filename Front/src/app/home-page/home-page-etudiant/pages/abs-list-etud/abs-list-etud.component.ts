import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from '../../../../models/Etudiant';
import { EtudiantService } from '../../../../services/etudiant.service';
import { Absence } from '../../../../models/Absence';

@Component({
  selector: 'app-abs-list-etud',
  templateUrl: './abs-list-etud.component.html',
  styleUrl: './abs-list-etud.component.scss'
})


export class AbsListEtudComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
  ) {}
  cours : String | null = null;
  idEtud : number | null = null;
  etudiant: Etudiant | null = null;
 foundAbsences: Absence[] = [];

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe(params => {
      // Retrieve the professeurId and groupe parameters from the query params
      this.idEtud = params['idEtud'] || null;
      this. cours  = params['cours'] || null;
      console.log(this.idEtud);
      console.log(this.cours);
    });
    if(this.idEtud!= null)
    this.fetchEtudiantById(this.idEtud);
  console.log(this.foundAbsences);
  }



  fetchEtudiantById(id: number): void {
    this.etudiantService.getEtudiantById(id).subscribe(
      (etudiant: Etudiant) => {
        this.etudiant = etudiant;
        console.log(this.etudiant );
        this.etudiant.absences.forEach((absence) => {
          // Check if the absence's session name matches the sessionNameToCheck
          if (absence.session.nomCours === this.cours) {
           
            // Add the absence to the foundAbsences array
            this.foundAbsences.push(absence);
          }
        });
      },
      (error: any) => {
        console.error('Error fetching etudiant:', error);
        // Handle error - show error message to user
      }
    );
  }



}
