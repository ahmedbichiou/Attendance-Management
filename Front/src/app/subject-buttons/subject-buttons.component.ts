import { Component, OnInit } from '@angular/core';
import { CoursService } from '../services/cours.service'; // Import the CoursService
import { Cours } from '../models/Cours'; // Import the Cours model

@Component({
  selector: 'app-subject-buttons',
  templateUrl: './subject-buttons.component.html',
  styleUrls: ['./subject-buttons.component.scss']
})
export class SubjectButtonsComponent implements OnInit {
  courses: Cours[] = [];

  constructor(private coursService: CoursService) { } // Inject the CoursService

  ngOnInit(): void {
    this.fetchCourses(); // Fetch courses when the component initializes
  }

  fetchCourses() {
    this.coursService.getAllCours().subscribe(
      (courses: Cours[]) => {
        this.courses = courses; // Assign fetched courses to the component's courses array
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  

  onClick(course: Cours) {
    console.log('Button clicked for course:', course);
    // Handle button click event as needed
  }
}
