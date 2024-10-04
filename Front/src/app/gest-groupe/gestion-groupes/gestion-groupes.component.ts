import { Component, OnInit } from '@angular/core';
import { Groupe } from '../../models/Groupe';
import { GroupeService } from '../../services/groupe.service';
import { Router } from '@angular/router';
import { Etudiant } from '../../models/Etudiant';

@Component({
  selector: 'app-gestion-groupes',
  templateUrl: './gestion-groupes.component.html',
  styleUrl: './gestion-groupes.component.scss'
})
export class GestionGroupesComponent implements OnInit {
  groupes: Groupe[] = [];
  selectedGroup: Groupe | null = null;
  SelectedGroupStudents: Etudiant[] = [];

  constructor(private groupeService: GroupeService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadGroupes();
    }, 100);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  loadGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(
      (data) => {
        this.groupes = data;
      },
      (error) => {
        console.error('Error loading groupes:', error);
      }
    );
  }


  saveSelectedGroup(group: Groupe): void {
    this.groupeService.selectedGroupe=group;
    console.log(this.groupeService.selectedGroupe);
    this.router.navigate(['./etudiantsParGroupe']);
    //this.router.navigate(['./etudiantsParGroupe'], { state: { selectedGroup: group } });
  }

  goBack() {
    this.router.navigate(['']); // Replace '/' with the route you want to navigate back to
  }

  deleteGroupe(groupe: Groupe): void {
    if (confirm('Are you sure you want to delete this groupe?')) {
      this.groupeService.deleteGroupe(groupe.nom).subscribe(
        () => {
          console.log('Groupe deleted successfully');
          // Optionally, you can remove the deleted groupe from the list
          this.groupes = this.groupes.filter(g => g !== groupe);
          this.router.navigate(['./groupes']);
        },
        (error) => {
          console.error('Error deleting groupe:', error);
          // Handle error message or display error to user
        }
      );
    }
  }
}
