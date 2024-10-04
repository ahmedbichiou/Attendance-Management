package com.enicarthage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enicarthage.entities.Absence;
import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.repositories.AbsenceRepository;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.repositories.SessionCoursRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AbsenceService{
	@Autowired
    AbsenceRepository absenceRepository;
	 @Autowired
	SessionCoursRepository sessionCoursRepository;
		@Autowired
	    EtudiantRepository etudiantRepository;
	 
    public AbsenceService(AbsenceRepository absenceRepository) {
        this.absenceRepository = absenceRepository;
    }

    public List<Absence> findAllAbsences() {
        return (List<Absence>) absenceRepository.findAll();
    }

    public Optional<Absence> findAbsenceById(Long id) {
        return absenceRepository.findById(id);
    }

    public Absence addAbsence(Absence absence) {
        // Fetch the SessionCours entity by its ID
        SessionCours sessionCours = sessionCoursRepository.findById(absence.getSession().getIdSession())
                .orElseThrow(() -> new RuntimeException("SessionCours not found with ID: " + absence.getSession().getIdSession()));

        // Fetch the Etudiant entity by its ID
        Etudiant etudiant = etudiantRepository.findById(absence.getEtudiant().getIdEtud())
                .orElseThrow(() -> new RuntimeException("Etudiant not found with ID: " + absence.getEtudiant().getIdEtud()));

        // Set the fetched entities to the absence
        absence.setSession(sessionCours);
        absence.setEtudiant(etudiant);

        // Persist the absence
        return absenceRepository.save(absence);
    }
    
   
    public Absence updateAbsence(Long id, Absence absenceDetails) {
        Absence absence = absenceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Absence not found with id " + id));
        // Update fields
        return absenceRepository.save(absence);
    }

    public void deleteAbsence(Long id) {
        Absence absence = absenceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Absence not found with id " + id));
        absenceRepository.delete(absence);
    }

    public List<Absence> findAbsencesByEtudiantId(Long etudiantId) {
        return absenceRepository.findByEtudiantIdEtud(etudiantId);
    }

}
