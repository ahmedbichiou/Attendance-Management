package com.enicarthage.services;

import com.enicarthage.entities.Professeur;
import com.enicarthage.repositories.ProfesseurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class ProfesseurServiceTest {


    @Mock
    private ProfesseurRepository professeurRepository;

    @InjectMocks
    private ProfesseurService professeurService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }



    @Test
    void saveProfesseur() {
        // Given
        Professeur professeurToSave = new Professeur();
        professeurToSave.setIdProfesseur(1L);
        professeurToSave.setNom("John");
        professeurToSave.setPrenom("Doe");
        professeurToSave.setDepartement("Computer Science");
        professeurToSave.setIdUser(101L);
        professeurToSave.setGroupes("Groupe A");

        // Mocking the repository's save method
        when(professeurRepository.save(any())).thenReturn(professeurToSave);

        // When
        Professeur savedProfesseur = professeurService.saveProfesseur(professeurToSave);

        // Then
        assertNotNull(savedProfesseur);
        assertEquals(professeurToSave.getIdProfesseur(), savedProfesseur.getIdProfesseur());
        assertEquals(professeurToSave.getNom(), savedProfesseur.getNom());
        assertEquals(professeurToSave.getPrenom(), savedProfesseur.getPrenom());
        assertEquals(professeurToSave.getDepartement(), savedProfesseur.getDepartement());
        assertEquals(professeurToSave.getIdUser(), savedProfesseur.getIdUser());
        assertEquals(professeurToSave.getGroupes(), savedProfesseur.getGroupes());

        // Verify that the save method of the repository is called once
        verify(professeurRepository, times(1)).save(any());
    }


    @Test
    void updateProfesseur() {
        // Given
        Long professeurId = 1L;
        Professeur existingProfesseur = new Professeur();
        existingProfesseur.setIdProfesseur(professeurId);
        existingProfesseur.setNom("Nom avant mise à jour");

        Professeur updatedProfesseur = new Professeur();
        updatedProfesseur.setIdProfesseur(professeurId);
        updatedProfesseur.setNom("Nom après mise à jour");

        when(professeurRepository.findById(professeurId)).thenReturn(Optional.of(existingProfesseur));
        when(professeurRepository.save(existingProfesseur)).thenReturn(updatedProfesseur);

        // When
        Professeur result = professeurService.updateProfesseur(professeurId, updatedProfesseur);

        // Then
        assertNotNull(result);
        assertEquals(updatedProfesseur.getNom(), result.getNom());
    }






}