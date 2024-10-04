package com.enicarthage.entities;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode

@Table(name = "session_cours")
public class SessionCours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSession;
    

    
    @JsonBackReference(value="cours-sessioncours")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cours_id")
    private Cours cours;
    

@JsonBackReference(value="absences")
	 @OneToMany(fetch = FetchType.LAZY, mappedBy = "session", cascade = CascadeType.ALL)
	private List<Absence> absences;
    
@Transient
private String nomCours;
    
    @Column(nullable = false)
    private LocalDateTime dateHeure;

    @Column(nullable = false)
    private String salle;

	public Long getIdSession() {
		return idSession;
	}

	public void setIdSession(Long idSession) {
		this.idSession = idSession;
	}



	public LocalDateTime getDateHeure() {
		return dateHeure;
	}

	public void setDateHeure(LocalDateTime dateHeure) {
		this.dateHeure = dateHeure;
	}

	public String getSalle() {
		return salle;
	}

	public void setSalle(String salle) {
		this.salle = salle;
	}
    public Cours getCours() {
        return cours;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }
    public String getNomCours() {
        if (cours != null) {
            return cours.getNomCours();
        }
        return null;
    }

    public void setNomCours(String nomCours) {
        this.nomCours = nomCours;
    }
    // Getters and Setters
}
