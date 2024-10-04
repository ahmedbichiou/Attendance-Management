package com.enicarthage.entities;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
@CrossOrigin(origins = "*")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode

@Table(name = "etudiants")
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEtud;

   
    private Long idUser;

   
    private String nom;
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

    
    private String prenom;

    @Column(unique = true)
    private String numeroTel;
    
    
    @JsonBackReference (value="groupe-etudiant")
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "groupe_nom")
    private Groupe group;

	 @OneToMany(fetch = FetchType.LAZY, mappedBy = "etudiant", cascade = CascadeType.ALL)
	private List<Absence> absences;
    
	public Long getIdEtud() {
		return idEtud;
	}

	public void setIdEtud(Long idEtud) {
		this.idEtud = idEtud;
	}

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
	
	public void setnomGroupe(String nomGroupe) {
        this.nomGroupe = nomGroupe;
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

	public Groupe getGroup() {
		return group;
	}

	public void setGroup(Groupe group) {
		this.group = group;
	}

	public List<Absence> getAbsences() {
		return absences;
	}

	public void setAbsences(List<Absence> absences) {
		this.absences = absences;
	}





    // Getters and Setters
    
}

