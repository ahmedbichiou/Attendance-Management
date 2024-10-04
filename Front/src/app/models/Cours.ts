import { Groupe } from "./Groupe";
import { SessionCours } from "./SessionCours";

export class Cours {
  nomCours: string;
  description: string;
  group: Groupe;
  idProfesseur: number;
  sessions: SessionCours[];
  absencesAutorisees: number;
  nomGroupe : number | null = null;

  constructor(
    nomCours: string,
    description: string,
    group: Groupe,
    idProfesseur: number,
    sessions: SessionCours[],
    absencesAutorisees: number
  ) {
    this.nomCours = nomCours;
    this.description = description;
    this.group = group;
    this.idProfesseur = idProfesseur;
    this.sessions = sessions;
    this.absencesAutorisees = absencesAutorisees;
  }
}

