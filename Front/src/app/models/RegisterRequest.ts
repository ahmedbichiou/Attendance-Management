import { Groupe } from "./Groupe";

enum Role {
    ÉTUDIANT = 'ÉTUDIANT',
    PROFESSEUR = 'PROFESSEUR',
    ADMINISTRATEUR = 'ADMINISTRATEUR'
  }
export class RegisterRequest {
    username: string;
    password: string;
    email: string;
    role?: Role;
    nom?: string;
    prenom?: string;
    numeroTel?: string;
    departement?: string;

    constructor(
      username: string,
      password: string,
      email: string,

    ) {
      this.username = username;
      this.password = password;
      this.email = email;
    }
  }
  
