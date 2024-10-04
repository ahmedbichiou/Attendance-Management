import { Component, OnInit } from '@angular/core';
import { ProfesseurService } from '../../services/professeur.service';
import { GroupeService } from '../../services/groupe.service';
import { Router } from '@angular/router';
import { Professeur } from '../../models/Professeur';
import { Groupe } from '../../models/Groupe';

@Component({
  selector: 'app-edit-professeur',
  templateUrl: './edit-professeur.component.html',
  styleUrls: ['./edit-professeur.component.scss']
})
export class EditProfesseurComponent implements OnInit {
  professeurToEdit: Professeur = new Professeur(0, 0, '', '', '', '');
  allGroupes: Groupe[] = [];
  selectedGroupes: { [key: string]: boolean } = {}; // Object to hold selected groups

  constructor(private professeurService: ProfesseurService, private groupeService: GroupeService, private router: Router) { }

  ngOnInit(): void {
    this.professeurService.loadSelectedAccountFromSessionStorage();
    if (this.professeurService.SelectedProf != null) {
      this.professeurToEdit = this.professeurService.SelectedProf;
    }

    // Fetch all available groups
    this.groupeService.getAllGroupes().subscribe(groupes => {
      this.allGroupes = groupes;
    });

    // Pre-select groups that the professor is part of
    if (this.professeurToEdit.groupes) {
      const selectedGroupesArray = this.professeurToEdit.groupes.split(',');
      // Loop through all available groups and set the selected state
      this.allGroupes.forEach(groupe => {
        this.selectedGroupes[groupe.nom] = selectedGroupesArray.includes(groupe.nom);
      });
    }
  }

  onSubmit(): void {
    // Convert selectedGroupes object to an array of selected group names
    const selectedGroupesArray = Object.keys(this.selectedGroupes).filter(key => this.selectedGroupes[key]);
    // Update the professeurToEdit object with the selected groups
    this.professeurToEdit.groupes = selectedGroupesArray.join(',');

    console.log(this.professeurToEdit);
    this.professeurService.updateProfesseur(this.professeurToEdit.idProfesseur, this.professeurToEdit)
      .subscribe(
        (updatedProfesseur) => {
          console.log('Professor updated successfully:', updatedProfesseur);
          // Optionally, you can navigate to another page or show a success message here
        },
        (error) => {
          console.error('Error updating professor:', error);
          // Handle error message or display error to user
        }
      );
    this.router.navigate(['./listProfAcc']);
  }
}
