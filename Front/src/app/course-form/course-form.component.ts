import { Component, OnInit } from '@angular/core';
import { Cours } from '../models/Cours';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  //course: Cours = new Cours();

  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    /*this.coursService.createCours(this.course).subscribe(
      (response) => {
        console.log('Course created successfully:', response);
        // Optionally, reset the form fields
        this.course = new Cours();
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );*/
  }
}
