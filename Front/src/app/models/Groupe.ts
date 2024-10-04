import { Cours } from "./Cours";
import { Etudiant } from "./Etudiant";

export class Groupe {
    nom: string;
    etudiants: Etudiant[];
    cours: Cours[];
  
    constructor(
      nom: string,
      etudiants: Etudiant[],
      cours: Cours[]
    ) {
      this.nom = nom;
      this.etudiants = etudiants;
      this.cours = cours;
    }
  }
  
 
  