import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeService } from '../../services/groupe.service';
import { Groupe } from '../../models/Groupe';

@Component({
  selector: 'app-create-groupe',
  templateUrl: './create-groupe.component.html',
  styleUrl: './create-groupe.component.scss'
})
export class CreateGroupeComponent {
  groupe: Groupe = new Groupe('', [], []);

  constructor(private groupeService: GroupeService, private router: Router) { }

  onSubmit(): void {
    this.groupeService.createGroupe(this.groupe).subscribe(
      () => {
        console.log('Groupe created successfully.');
      },
      (error) => {
        console.error('Error creating groupe:', error);
      }
    );
    this.router.navigate(['./groupes']);
  }
}
