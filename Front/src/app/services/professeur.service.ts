import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professeur } from '../models/Professeur';
import { Cours } from '../models/Cours';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  private apiUrl = 'http://localhost:8081/professeurs';
  SelectedProf: Professeur | undefined;
  private readonly storageKey = 'profAcc';
  selectedProfesseur: Professeur | undefined;

  constructor(private http: HttpClient) { }

  saveSelectedAccountToSessionStorage() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.SelectedProf));
  }

  loadSelectedAccountFromSessionStorage() {
    const storedAccount = sessionStorage.getItem(this.storageKey);
    if (storedAccount) {
      this.SelectedProf = JSON.parse(storedAccount);
    }
  }

  getAllProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.apiUrl}`);
  }

  getProfesseurById(id: number): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.apiUrl}/${id}`);
  }

  createProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(`${this.apiUrl}`, professeur);
  }

  updateProfesseur(id: number, professeur: Professeur): Observable<Professeur> {
    return this.http.put<Professeur>(`${this.apiUrl}/${id}`, professeur);
  }

  deleteProfesseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
}
