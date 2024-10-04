package com.enicarthage.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.enicarthage.entities.Absence;

@Repository
public interface AbsenceRepository extends CrudRepository<Absence, Long> {
	List<Absence> findByEtudiantIdEtud(Long etudiantId);
	
	
	
}
