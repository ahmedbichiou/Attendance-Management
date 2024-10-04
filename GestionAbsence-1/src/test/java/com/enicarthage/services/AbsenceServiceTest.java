package com.enicarthage.services;

import com.enicarthage.entities.Absence;
import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.repositories.AbsenceRepository;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.repositories.SessionCoursRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AbsenceServiceTest {

    @Mock
    private AbsenceRepository absenceRepository;

    @Mock
    private SessionCoursRepository sessionCoursRepository;

    @Mock
    private EtudiantRepository etudiantRepository;

    @InjectMocks
    private AbsenceService absenceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }






    @Test
    void updateAbsence() {
        // ID de l'absence simulée
        Long absenceId = 1L;

        // Créer une absence simulée
        Absence absence = new Absence();
        absence.setIdAbsence(absenceId);

        // Créer une absence simulée mise à jour
        Absence updatedAbsence = new Absence();
        updatedAbsence.setIdAbsence(absenceId);
        // Ajoutez ici les modifications que vous souhaitez tester

        // Définir le comportement simulé du repository pour retourner l'absence simulée
        when(absenceRepository.findById(absenceId)).thenReturn(Optional.of(absence));
        // Définir le comportement simulé du repository pour retourner l'absence mise à jour
        when(absenceRepository.save(absence)).thenReturn(updatedAbsence);

        // Appeler la méthode à tester
        Absence result = absenceService.updateAbsence(absenceId, updatedAbsence);

        // Vérifier si la méthode save du repository a été appelée avec l'absence mise à jour
        verify(absenceRepository).save(updatedAbsence);

        // Vérifier si l'absence retournée par la méthode est l'absence mise à jour
        assertEquals(updatedAbsence, result);
    }

    @Test
    void deleteAbsence() {
        // ID de l'absence simulée
        Long absenceId = 1L;

        // Créer une absence simulée
        Absence absence = new Absence();
        absence.setIdAbsence(absenceId);

        // Définir le comportement simulé du repository pour retourner l'absence simulée
        when(absenceRepository.findById(absenceId)).thenReturn(Optional.of(absence));

        // Appeler la méthode à tester
        absenceService.deleteAbsence(absenceId);

        // Vérifier si la méthode delete du repository a été appelée avec l'ID d'absence correct
        verify(absenceRepository).delete(absence);
    }


}