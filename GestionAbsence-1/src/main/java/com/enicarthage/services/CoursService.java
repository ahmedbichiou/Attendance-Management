package com.enicarthage.services;

import com.enicarthage.entities.Cours;
import com.enicarthage.entities.Groupe;
import com.enicarthage.entities.Professeur;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.repositories.CoursRepository;
import com.enicarthage.repositories.GroupeRepository;
import com.enicarthage.repositories.ProfesseurRepository;
import com.enicarthage.repositories.SessionCoursRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursService {

    @Autowired
    private CoursRepository coursRepository;
    @Autowired
    private GroupeRepository groupeRepository;
    @Autowired
    private SessionCoursRepository sessioncoursRepository;
    @Autowired
    private ProfesseurRepository professeurRepository;

    public List<Cours> getAllCours() {
        return (List<Cours>) coursRepository.findAll();
    }

    public Cours getCoursByNom(String nomCours) {
        return coursRepository.findById(nomCours).orElse(null);
    }
    public Cours createCours(Cours cours) {
        if (cours.getGroup() == null || cours.getGroup().getNom() == null) {
            throw new IllegalArgumentException("Cours must have a valid group associated with it");
        }
        
        Groupe groupe = groupeRepository.findByNom(cours.getGroup().getNom());
        if (groupe == null) {
            throw new IllegalArgumentException("Group with name " + cours.getGroup().getNom() + " not found");
        }
        cours.setGroup(groupe);
        
        return coursRepository.save(cours);
    }


    public Cours updateCours(String nomCours, Cours cours) {
        if (coursRepository.existsById(nomCours)) {
            cours.setNomCours(nomCours);
            return coursRepository.save(cours);
        } else {
            return null; // or throw exception
        }
    }

    public void deleteCours(String nomCours) {
        coursRepository.deleteById(nomCours);
    }

    @Transactional
    public SessionCours addSessionCours(String nomCours, SessionCours sessionCours) {
        Cours cours = coursRepository.findById(nomCours)
                .orElseThrow(() -> new RuntimeException("Cours not found with name: " + nomCours));
        sessionCours.setCours(cours);
        return sessioncoursRepository.save(sessionCours);
    }
    
    public Cours getCoursBySessionId(Long sessionId) {
        return coursRepository.findBySessionsIdSession(sessionId);
    }
    
    public List<Cours> getCoursByProfesseurId(Long professeurId) {
        return coursRepository.findByIdProfesseur(professeurId);
    }
    
    public Professeur getProfesseurByNomCours(String nomCours) {
        Cours cours = coursRepository.findByNomCours(nomCours);
        if (cours != null) {
            return professeurRepository.findById(cours.getIdProfesseur()).orElse(null);
        } else {
            return null;
        }
    }
    public List<SessionCours> getSessionCoursByNomCours(String nomCours) {
        return coursRepository.findByNomCours(nomCours).getSessions();
    }
    
}
