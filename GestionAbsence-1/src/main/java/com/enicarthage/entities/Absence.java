package com.enicarthage.entities;

import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

@Table(name = "absences")
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAbsence;

 


    @Column(nullable = true)
    private String raison;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Statut statut;

    public enum Statut {
        JUSTIFIEE, NON_JUSTIFIEE
    }


    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "absences")
    private Etudiant etudiant;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "idSession")
    private SessionCours session;
    
	public Long getIdAbsence() {
		return idAbsence;
	}

	public void setIdAbsence(Long idAbsence) {
		this.idAbsence = idAbsence;
	}

	  @Transient
	    private Long idEtud;
	  

	    @Transient
	    private Long sessionId;

	public String getRaison() {
		return raison;
	}

	public void setRaison(String raison) {
		this.raison = raison;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public SessionCours getSession() {
		return session;
	}

	public void setSession(SessionCours session) {
		this.session = session;
	}

	public Etudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}
	// Getter method for idEtud
    public Long getIdEtud() {
        if (etudiant != null) {
            return etudiant.getIdEtud();
        } else {
            return null;
        }
    }

    // Setter method for idEtud
    public void setIdEtud(Long idEtud) {
        this.idEtud = idEtud;
    }
    public Long getSessionId() {
        // Implement logic to retrieve session id from the session object
        if (session != null) {
            return session.getIdSession();
        } else {
            return null;
        }
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    // Getters and Setters
}