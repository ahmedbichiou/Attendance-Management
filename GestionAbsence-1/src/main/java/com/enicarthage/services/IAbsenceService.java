package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.enicarthage.entities.Absence;
import com.enicarthage.repositories.AbsenceRepository;

public interface IAbsenceService {
    List<Absence> findAllAbsences();
    Optional<Absence> findAbsenceById(Long id);
    Absence saveAbsence(Absence absence);
    Absence updateAbsence(Long id, Absence absenceDetails);
    void deleteAbsence(Long id);
}
