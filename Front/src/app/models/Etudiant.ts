import { Absence } from "./Absence";
import { Groupe } from "./Groupe";

export class Etudiant {
  idEtud: number;
  idUser: number;
  nom: string;
  prenom: string;
  numeroTel: string;
  group: Groupe;
  absences: Absence[];
  nomGroupe : string;

  constructor(
    idEtud: number,
    idUser: number,
    nom: string,
    prenom: string,
    numeroTel: string,
    group: Groupe,
    absences: Absence[],
    nomGroupe : string
  ) {
    this.idEtud = idEtud;
    this.idUser = idUser;
    this.nom = nom;
    this.prenom = prenom;
    this.numeroTel = numeroTel;
    this.group = group;
    this.absences = absences;
    this.nomGroupe =  nomGroupe;
  }
}

