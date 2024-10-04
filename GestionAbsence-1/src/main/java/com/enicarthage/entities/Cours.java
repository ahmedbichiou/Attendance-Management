package com.enicarthage.entities;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
@CrossOrigin(origins = "*")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode

@Table(name = "cours")
public class Cours {


    @Id
    private String nomCours;

    private String description;
	private Long idProfesseur;
    @JsonBackReference (value="groupe-cours")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "groupe_nom")
    private Groupe group;
    
    
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "cours", cascade = CascadeType.ALL)
	private List<SessionCours> sessions;
 
    private int absencesAutorisees;




	public String getNomCours() {
		return nomCours;
	}


	public void setNomCours(String nomCours) {
		this.nomCours = nomCours;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	


	public int getAbsencesAutorisees() {
		return absencesAutorisees;
	}


	public void setAbsencesAutorisees(int absencesAutorisees) {
		this.absencesAutorisees = absencesAutorisees;
	}


	public List<SessionCours> getSessions() {
		return sessions;
	}


	public void setSessions(List<SessionCours> sessions) {
		this.sessions = sessions;
	}


	public Groupe getGroup() {
		return group;
	}


	public void setGroup(Groupe group) {
		this.group = group;
	}

	public Long getIdProfesseur() {
		return idProfesseur;
	}

	public void setIdProfesseur(Long idProfesseur) {
		this.idProfesseur = idProfesseur;
	}
	
	
    @Transient
    private String nomGroupe;
    public String getnomGroupe() {
        // Implement logic to retrieve session id from the session object
        if ( group != null) {
            return group.getNom();
        } else {
            return null;
        }
    }

    // Getters and Setters
}
