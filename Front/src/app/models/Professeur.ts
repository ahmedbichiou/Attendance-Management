export class Professeur {
  idProfesseur: number;
  idUser: number;
  nom: string;
  prenom: string;
  departement: string;
  groupes: string;

  constructor(
    idProfesseur: number,
    idUser: number,
    nom: string,
    prenom: string,
    departement: string,
    groupes: string
  ) {
    this.idProfesseur = idProfesseur;
    this.idUser = idUser;
    this.nom = nom;
    this.prenom = prenom;
    this.departement = departement;
    this.groupes = groupes;
  }
}
