import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/Cours';
import { SessionCours } from '../models/SessionCours';
import { Professeur } from '../models/Professeur';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:8081/cours';

  constructor(private http: HttpClient) { }

  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}`);
  }

  getCoursByNom(nomCours: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${nomCours}`);
  }

  createCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}`, cours);
  }

  updateCours(nomCours: string, cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/${nomCours}`, cours);
  }

  deleteCours(nomCours: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nomCours}`);
  }

  addSessionCours(nomCours: string, sessionCours: SessionCours): Observable<SessionCours> {
    return this.http.post<SessionCours>(`${this.apiUrl}/${nomCours}/sessions`, sessionCours);
  }

  getCoursBySessionId(sessionId: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/bySessionId/${sessionId}`);
  }

  getCoursByProfesseurId(professeurId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/byProfesseurId/${professeurId}`);
  }

  getProfesseurByNomCours(nomCours: string): Observable<Professeur> {
    return this.http.get<Professeur>(`${this.apiUrl}/professeur/${nomCours}`);
  }

  getSessionCoursByNomCours(nomCours: string): Observable<SessionCours[]> {
    return this.http.get<SessionCours[]>(`${this.apiUrl}/${nomCours}/sessions`);
  }

}
