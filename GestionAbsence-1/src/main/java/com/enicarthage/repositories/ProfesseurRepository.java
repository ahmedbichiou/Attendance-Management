package com.enicarthage.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Professeur;

@Repository
public interface ProfesseurRepository extends  CrudRepository<Professeur, Long> {
    // Méthodes personnalisées si nécessaire
	List<Professeur> findByIdUser(Long idUser);
}
