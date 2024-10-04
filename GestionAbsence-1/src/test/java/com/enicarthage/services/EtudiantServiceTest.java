package com.enicarthage.services;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Groupe;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.repositories.GroupeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class EtudiantServiceTest {

    @Mock
    private EtudiantRepository etudiantRepository;

    @Mock
    private GroupeRepository groupeRepository;

    @InjectMocks
    private EtudiantService etudiantService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findAllEtudiants() {
        // Prepare test data
        List<Etudiant> etudiants = new ArrayList<>();
        etudiants.add(new Etudiant());
        etudiants.add(new Etudiant());

        // Mock repository method
        when(etudiantRepository.findAll()).thenReturn(etudiants);

        // Call service method
        List<Etudiant> result = etudiantService.findAllEtudiants();

        // Assertions
        assertEquals(2, result.size());
    }

    @Test
    void findEtudiantById() {
        // Prepare test data
        Long id = 1L;
        Etudiant etudiant = new Etudiant();
        etudiant.setIdEtud(id);

        // Mock repository method
        when(etudiantRepository.findById(id)).thenReturn(Optional.of(etudiant));

        // Call service method
        Optional<Etudiant> result = etudiantService.findEtudiantById(id);

        // Assertions
        assertTrue(result.isPresent());
        assertEquals(id, result.get().getIdEtud());
    }

    @Test
    void saveEtudiant() {
        // Prepare test data
        Etudiant etudiant = new Etudiant();
        etudiant.setNom("John");
        etudiant.setPrenom("Doe");
        etudiant.setNumeroTel("123456789");
        Groupe groupe = new Groupe();
        groupe.setNom("Groupe A");
        etudiant.setGroup(groupe);

        // Mock repository method
        when(groupeRepository.findByNom("Groupe A")).thenReturn(groupe);
        when(etudiantRepository.save(etudiant)).thenReturn(etudiant);

        // Call service method
        Etudiant savedEtudiant = etudiantService.saveEtudiant(etudiant);

        // Assertions
        assertNotNull(savedEtudiant);
        assertEquals("John", savedEtudiant.getNom());
    }

}
