import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from '../../../../models/Cours';
import { CoursService } from '../../../../services/cours.service';
import { Groupe } from '../../../../models/Groupe';
import { GroupeService } from '../../../../services/groupe.service';

@Component({
  selector: 'app-matiersprof',
  templateUrl: './matiersprof.component.html',
  styleUrls: ['./matiersprof.component.scss']
})
export class MatiersprofComponent implements OnInit {
  groupe: string | null = null;
  professeurId: number | null = null;
  courses: Cours[] = [];
  group: Groupe | null = null;
  filteredCourses : Cours[] =[];
  constructor(
    private route: ActivatedRoute,
    private groupeService: GroupeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.queryParams.subscribe(params => {
      // Retrieve the professeurId and groupe parameters from the query params
      this.professeurId = params['professeurId'] ? +params['professeurId'] : null;
      this.groupe = params['groupe'] || null;


      // Load the group information
      if (this.groupe !== null) {
        this.loadGroupByName(this.groupe);
      }
      setTimeout(() => {
        if (this.professeurId !== null && this.group !== null) {
        this.loadCoursesByGroupeAndProfesseurId(this.group, this.professeurId);
      }
     
      }, 100);
      // Load the courses for the given professeurId and groupe
     
    });
  }

  loadGroupByName(nom: string): void {
    this.groupeService.getGroupeByNom(nom).subscribe(
      (group: Groupe) => {
        this.group = group;
        //console.log(this.group);
      },
      (error: any) => {
        console.error('Error fetching group:', error);
      }
    );
  }

  loadCoursesByGroupeAndProfesseurId(group: Groupe, professeurId: number): void {
    group.cours.forEach(item => {
      if (item.idProfesseur == professeurId)
        {
          this.filteredCourses.push(item);
        }
    });
    
  }
  goToFeuilleAbsence(course: Cours): void {
    if (this.group && this.professeurId !== null) {
      this.router.navigate(['/feuille-absence-prof'], {
        queryParams: {
          groupe: this.group.nom,
          professeurId: this.professeurId,
          cours: course.nomCours // Assuming you want to pass the course name
        }
      });
    }
  }

  
}
