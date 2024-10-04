import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../models/Etudiant';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { Groupe } from '../../models/Groupe';
import { GroupeService } from '../../services/groupe.service';

@Component({
  selector: 'app-edit-etud',
  templateUrl: './edit-etud.component.html',
  styleUrl: './edit-etud.component.scss'
})
export class EditEtudComponent implements OnInit {
  selectedEtudiant: Etudiant | null = null;
  allGroupes: Groupe[] = [];
  fromAllEtudiants: Boolean=false;
  
  constructor(
    private router: Router,
    private etudiantService: EtudiantService,
    private groupeService: GroupeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const state = history.state;
    if (state && state.selectedEtudiant) {
      this.selectedEtudiant = state.selectedEtudiant;
      console.log(this.selectedEtudiant);
    }
    });

    this.route.paramMap.subscribe(params => {
      const state = history.state;////////---------------------------------------------------
    if (state && state.selectedEtudiantToEdit) {
      this.fromAllEtudiants=true;
      this.selectedEtudiant = state.selectedEtudiantToEdit;
      console.log(this.selectedEtudiant);
    }
    });
    
    this.getAllGroupes();
  }

  getAllGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(
      (groupes) => {
        this.allGroupes = groupes;
        console.log('All Groupes:', groupes);
      },
      (error) => {
        console.error('Error fetching groupes:', error);
      }
    );
  }

  updateGroupName(newName: string): void {
    if (this.selectedEtudiant) {
      if (!this.selectedEtudiant.group) {
        this.selectedEtudiant.group = new Groupe('', [], []);
        this.selectedEtudiant.group.nom = newName; // Ensure group object exists
      }
      this.selectedEtudiant.group.nom = newName;
    }
  }

  onSubmit(): void {
    console.log('+++++++++++++++',this.selectedEtudiant);
    if (this.selectedEtudiant) {
      this.etudiantService.updateEtudiant(this.selectedEtudiant.idEtud, this.selectedEtudiant)
        .subscribe(
          (updatedEtudiant) => {
            console.log('Etudiant updated successfully:', updatedEtudiant);
            // Optionally, you can navigate to another page or show a success message here
          },
          (error) => {
            console.error('Error updating etudiant:', error);
            // Handle error message or display error to user
          }
        );
    }
    if (this.fromAllEtudiants) {////////---------------------------------------------------
      this.router.navigate(['./allEtudiants']);
    }
    else{
      this.router.navigate(['./etudiantsParGroupe']); 
    }
    
   
    
  }
  
    
}