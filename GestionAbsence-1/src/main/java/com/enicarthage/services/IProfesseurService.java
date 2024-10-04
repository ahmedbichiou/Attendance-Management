package com.enicarthage.services;


import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.Professeur;

public interface IProfesseurService {
   List<Professeur> findAllProfesseurs();
   Optional<Professeur> findProfesseurById(Long id);
   Professeur saveProfesseur(Professeur professeur);
   Professeur updateProfesseur(Long id, Professeur professeurDetails) ;
   public void deleteProfesseur(Long id);
}

