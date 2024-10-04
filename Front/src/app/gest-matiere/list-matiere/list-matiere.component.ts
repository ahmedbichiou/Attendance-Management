import { Component, OnInit } from '@angular/core';
import { Cours } from '../../models/Cours';
import { CoursService } from '../../services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrl: './list-matiere.component.scss'
})
export class ListMatiereComponent implements OnInit {
  courses: Cours[] = [];
  selectedCours: Cours | null = null;

  constructor(private coursService: CoursService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadCourses();
    }, 100);
 
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
}

  loadCourses(): void {
    this.coursService.getAllCours().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }


  deleteCourse(course: Cours): void {
    if (confirm("Are you sure you want to delete this course?")) {
      this.coursService.deleteCours(course.nomCours).subscribe(
        () => {
          this.courses = this.courses.filter(c => c !== course);
          console.log('Course deleted successfully.');
          this.router.navigate(['./matieres']);
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }

  selectCourse(course: Cours): void {
    if (course) {
      this.router.navigate(['./courseSessions'], { state: { selectedCoursForSession: course } });
    } else {
      console.error('No course selected.');
    }
  }

  goBack() {
    this.router.navigate(['']); // Replace '/' with the route you want to navigate back to
  }
}