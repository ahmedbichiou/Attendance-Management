package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.repositories.EtudiantRepository;

public interface IEtudiantService {
    
	List<Etudiant> findAllEtudiants();
    Optional<Etudiant> findEtudiantById(Long id);
    Etudiant saveEtudiant(Etudiant etudiant);
    Etudiant updateEtudiant(Long id, Etudiant etudiantDetails);
    void deleteEtudiant(Long id);

}
