package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.Cours;

public interface ICoursService {
    Cours saveCours(Cours cours);
    Optional<Cours> getCoursById(Long id);
    List<Cours> getAllCours();
    Cours updateCours(Cours cours);
    void deleteCours(Long id);
}
