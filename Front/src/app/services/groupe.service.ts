import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groupe } from '../models/Groupe';
import { Etudiant } from '../models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private apiUrl = 'http://localhost:8081/groupes';
  selectedGroupe: Groupe = new Groupe('', [], []);

  constructor(private http: HttpClient) { }

  getAllGroupes(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(`${this.apiUrl}`);
  }

  getGroupeByNom(nom: string): Observable<Groupe> {
    return this.http.get<Groupe>(`${this.apiUrl}/${nom}`);
  }

  createGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${this.apiUrl}`, groupe);
  }

  deleteGroupe(nom: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nom}`);
  }

  getStudentsByGroup(nom: string): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/${nom}/students`);
  }
}
