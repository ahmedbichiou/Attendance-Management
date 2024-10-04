package com.enicarthage.entities.DTOs;

import com.enicarthage.entities.Groupe;
import com.enicarthage.entities.User;

public class SignUpRequest {
    private String username;
    private String password;
    private String email;
    private User.Role role;
    // Shared fields
    private String nom;
    private String prenom;
    // Student-specific
    private String numeroTel;
    private Groupe groupe;
    // Professor-specific
    private String departement;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public User.Role getRole() {
		return role;
	}
	public void setRole(User.Role role) {
		this.role = role;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getNumeroTel() {
		return numeroTel;
	}
	public void setNumeroTel(String numeroTel) {
		this.numeroTel = numeroTel;
	}
	public Groupe getGroupe() {
		return groupe;
	}
	public void setGroupe(Groupe groupe) {
		this.groupe = groupe;
	}
	public String getDepartement() {
		return departement;
	}
	public void setDepartement(String departement) {
		this.departement = departement;
	}

    // Getters and Setters
    
}


