enum Role {
    ÉTUDIANT = 'ÉTUDIANT',
    PROFESSEUR = 'PROFESSEUR',
    ADMINISTRATEUR = 'ADMINISTRATEUR'
  }
  export class User {
    idUser?: number; // Made optional since it may not be present before saving a new user
    username: string;
    password: string;
    role: Role;
    email: string;
  
    constructor(
      idUser: number | null,
      username: string,
      password: string,
      role: Role,
      email: string
    ) {
      if (idUser) this.idUser = idUser;
      this.username = username;
      this.password = password;
      this.role = role;
      this.email = email;
    }
  }
  