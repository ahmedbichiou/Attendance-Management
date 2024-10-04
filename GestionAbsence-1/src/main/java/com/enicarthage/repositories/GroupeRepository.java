package com.enicarthage.repositories;

import com.enicarthage.entities.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    Groupe findByNom(String nom);
}
