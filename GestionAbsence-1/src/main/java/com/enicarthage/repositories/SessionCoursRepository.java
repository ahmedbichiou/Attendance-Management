package com.enicarthage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enicarthage.entities.SessionCours;

@Repository
public interface SessionCoursRepository extends JpaRepository<SessionCours, Long> {
    // Méthodes personnalisées si nécessaire
}

