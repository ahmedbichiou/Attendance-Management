import { Injectable } from '@angular/core';
import { Professeur } from '../../models/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfessorManageService {
  private currentProfessor: Professeur | undefined;

  constructor() { }

  setCurrentProfessor(professor: Professeur): void {
    this.currentProfessor = professor;
  }

  getCurrentProfessor(): Professeur | undefined {
    return this.currentProfessor;
  }

  clearCurrentProfessor(): void {
    this.currentProfessor = undefined;
  }
}
