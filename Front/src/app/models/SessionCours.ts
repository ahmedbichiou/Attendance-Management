import { Absence } from "./Absence";
import { Cours } from "./Cours";

export class SessionCours {
    idSession: number;
    cours: Cours;
    absences: Absence[];
    dateHeure: Date;
    salle: string;
    nomCours: string | null = null;
    constructor(
      idSession: number,
      cours: Cours,
      absences: Absence[],
      dateHeure: Date,
      salle: string,
      
    ) {
      this.idSession = idSession;
      this.cours = cours;
      this.absences = absences;
      this.dateHeure = dateHeure;
      this.salle = salle;
    
    }
  }
  

  