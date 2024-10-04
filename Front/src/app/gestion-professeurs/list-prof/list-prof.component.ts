import { Component, OnInit } from '@angular/core';
import { Professeur } from '../../models/Professeur';
import { ProfesseurService } from '../../services/professeur.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.component.html',
  styleUrl: './list-prof.component.scss'
})
export class ListProfComponent implements OnInit {
  professeurs: Professeur[] = [];

  constructor(private professeurService: ProfesseurService, private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.loadProfesseurs();
    }, 100);
  
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
}

saveSelectedProfesseur(professeur: Professeur): void {
  this.professeurService.selectedProfesseur = professeur;
  console.log('Selected professeur:', professeur);
  this.router.navigate(['./profCours']);
}
  loadProfesseurs(): void {
    this.professeurService.getAllProfesseurs().subscribe(
      (data) => {
        this.professeurs = data;
      },
      (error) => {
        console.error('Error loading professeurs:', error);
      }
    );
  }

  editProfesseur(professeur: Professeur): void {
    this.router.navigate(['./editProfcc']);
    this.professeurService.SelectedProf=professeur;
    this.professeurService.saveSelectedAccountToSessionStorage();
  }

  goBack() {
    this.router.navigate(['']); // Replace '/' with the route you want to navigate back to
  }

  deleteProfesseur(professeur: Professeur): void {
    if (confirm("Are you sure you want to delete this professor?")) {
        this.professeurService.deleteProfesseur(professeur.idProfesseur).subscribe(
            () => {
                // Remove the deleted professor from the array
                this.professeurs = this.professeurs.filter(p => p !== professeur);
                console.log('Professor deleted successfully.');
                this.router.navigate(['/listProfAcc']);
            },
            (error) => {
                console.error('Error deleting professor:', error);
            }
        );
    }
}


}


