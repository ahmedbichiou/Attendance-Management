import { Etudiant } from "./Etudiant";
import { SessionCours } from "./SessionCours";

export class Absence {
  idAbsence: number;
  raison: string | null; // Nullable string
  statut: Statut;
  etudiant: Etudiant;
  session: SessionCours;
  sessionId: number | null;
  idEtud : number | null;

  constructor(
    idAbsence: number,
    raison: string | null,
    statut: Statut,
    etudiant: Etudiant,
    session: SessionCours,
    sessionId: number,
    idEtud : number
  ) {
    this.idAbsence = idAbsence;
    this.raison = raison;
    this.statut = statut;
    this.etudiant = etudiant;
    this.session = session;
    this.sessionId = sessionId;
    this.idEtud=idEtud;
  }
}

export enum Statut {
  JUSTIFIEE = 'JUSTIFIEE',
  NON_JUSTIFIEE = 'NON_JUSTIFIEE'
}


