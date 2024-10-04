package com.enicarthage.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enicarthage.entities.Etudiant;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    // Méthodes personnalisées si nécessaire
    List<Etudiant> findByIdUser(Long idUser);
    
}
