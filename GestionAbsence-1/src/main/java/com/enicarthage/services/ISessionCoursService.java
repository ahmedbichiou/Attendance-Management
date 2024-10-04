package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.SessionCours;

public interface ISessionCoursService {
    SessionCours saveSessionCours(SessionCours sessionCours);
    Optional<SessionCours> getSessionCoursById(Long id);
    List<SessionCours> getAllSessionCours();
    SessionCours updateSessionCours(SessionCours sessionCours);
    void deleteSessionCours(Long id);
}
