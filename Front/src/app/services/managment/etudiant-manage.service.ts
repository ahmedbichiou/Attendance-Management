import { Injectable } from '@angular/core';
import { Etudiant } from '../../models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantManageService {
  private currentEtudiant: Etudiant | undefined;

  constructor() { }

  setCurrentEtudiant(etudiant: Etudiant): void {
    this.currentEtudiant = etudiant;
  }

  getCurrentEtudiant(): Etudiant | undefined {
    return this.currentEtudiant;
  }

  clearCurrentEtudiant(): void {
    this.currentEtudiant = undefined;
  }
}