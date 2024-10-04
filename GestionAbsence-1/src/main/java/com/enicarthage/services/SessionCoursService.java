package com.enicarthage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.Cours;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.repositories.CoursRepository;
import com.enicarthage.repositories.SessionCoursRepository;

@Service
public class SessionCoursService {

    @Autowired
    private SessionCoursRepository sessionCoursRepository;
    @Autowired
    private CoursRepository coursRepository;

    public List<SessionCours> findAllSessionCours() {
        return sessionCoursRepository.findAll();
    }

    public Optional<SessionCours> findSessionCoursById(Long id) {
        return sessionCoursRepository.findById(id);
    }

    public SessionCours saveSessionCours(SessionCours sessionCours) {
        // Check if the sessionCours object has a valid course associated with it
        if (sessionCours.getCours() == null || sessionCours.getCours().getNomCours() == null) {
            throw new IllegalArgumentException("SessionCours must have a valid course associated with it");
        }
        
        // Fetch the course by its name
        Cours cours = coursRepository.findById(sessionCours.getCours().getNomCours())
                .orElseThrow(() -> new IllegalArgumentException("Course with name " + sessionCours.getCours().getNomCours() + " not found"));

        // Associate the fetched course with the sessionCours object
        sessionCours.setCours(cours);

        // Save the sessionCours
        return sessionCoursRepository.save(sessionCours);
    }


    public SessionCours updateSessionCours(Long id, SessionCours sessionCoursDetails) {
        SessionCours sessionCours = sessionCoursRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("SessionCours not found with id " + id));
        sessionCours.setDateHeure(sessionCoursDetails.getDateHeure());
        sessionCours.setSalle(sessionCoursDetails.getSalle());
        sessionCours.setCours(sessionCoursDetails.getCours());
        return sessionCoursRepository.save(sessionCours);
    }

    public void deleteSessionCours(Long id) {
        SessionCours sessionCours = sessionCoursRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("SessionCours not found with id " + id));
        sessionCoursRepository.delete(sessionCours);
    }
}
