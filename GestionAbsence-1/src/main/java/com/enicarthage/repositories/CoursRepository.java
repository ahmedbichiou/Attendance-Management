package com.enicarthage.repositories;

import com.enicarthage.entities.Cours;
import com.enicarthage.entities.SessionCours;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursRepository extends JpaRepository<Cours, String> {
    Cours findByNomCours(String nomCours);
    Cours findBySessionsIdSession(Long sessionId);
    default SessionCours saveSessionCours(SessionCours sessionCours) {
        sessionCours.getCours().getSessions().add(sessionCours);
        return sessionCours;
    }
    List<Cours> findByIdProfesseur(Long professeurId);
}
