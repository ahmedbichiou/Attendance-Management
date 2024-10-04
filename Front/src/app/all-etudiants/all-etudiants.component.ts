import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/Etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-etudiants',
  templateUrl: './all-etudiants.component.html',
  styleUrl: './all-etudiants.component.scss'
})
export class AllEtudiantsComponent implements OnInit {

  etudiants: Etudiant[] = [];

  constructor(private etudiantService: EtudiantService,
              private router: Router,
  ) { }

  ngOnInit(): void {
   
    setTimeout(() => {
      this.fetchAllEtudiants();
    }, 100);
  }

  fetchAllEtudiants(): void {
    this.etudiantService.getAllEtudiants()
      .subscribe(
        (etudiants: Etudiant[]) => {
          this.etudiants = etudiants;
        },
        (error) => {
          console.error('Error fetching etudiants:', error);
        }
      );
  }


  editEtudiant(etudiant: Etudiant): void {
    this.router.navigate(['./editEtud'], { state: { selectedEtudiantToEdit: etudiant } });}
}
