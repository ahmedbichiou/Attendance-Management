import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { Router } from '@angular/router';
import { AbsenceService } from '../services/absence.service';
import { Absence } from '../models/Absence';
//import { AbsenceService } from '../absence.service'; // Import the service to fetch absence details

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss']
})
export class AbsenceDetailsComponent implements OnInit {
  absences: Absence[] = []; // Define the absences array to hold absence details
 
  constructor(private route: ActivatedRoute, private absenceService: AbsenceService) { }

  ngOnInit(): void {
    // Get the student ID from the route parameters
    /*this.route.paramMap.subscribe(params => {
      const studentId = params.get('id');
      console.log('Student ID:', studentId); 
      if (studentId) {
        // Convert the studentId to a number
        const parsedStudentId = parseInt(studentId, 10);
        // Call the getAbsenceByIdetudiant method with the studentId
        this.absenceService.getAbsenceByIdetudiant(parsedStudentId).subscribe(
          (absences: Absence[]) => {
            // Assign fetched absence data to the component's absences array
            this.absences = absences;
           
          },
          (error) => {
            console.error('Error fetching absences:', error);
          }
        );
      }
    });*/
  }
}



