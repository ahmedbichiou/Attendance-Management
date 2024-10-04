package com.enicarthage.services;

import com.enicarthage.entities.Cours;
import com.enicarthage.entities.Groupe;
import com.enicarthage.repositories.CoursRepository;
import com.enicarthage.repositories.GroupeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CoursServiceTest {

    @InjectMocks
    private CoursService coursService;

    @Mock
    private CoursRepository coursRepository;

    @Mock
    private GroupeRepository groupeRepository ;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getAllCours_ReturnsAllCours() {
        // Créer des cours simulés
        Cours cours1 = new Cours();
        Cours cours2 = new Cours();
        List<Cours> allCours = Arrays.asList(cours1, cours2);

        // Définir le comportement simulé du repository
        when(coursRepository.findAll()).thenReturn(allCours);

        // Appeler la méthode à tester
        List<Cours> result = coursService.getAllCours();

        // Vérifier le résultat
        assertEquals(allCours.size(), result.size());
        assertTrue(result.contains(cours1));
        assertTrue(result.contains(cours2));
    }

    // Implémenter les a







    @Test
    void updateCours_UpdatesExistingCours() {
        // Créer un cours simulé existant
        String coursName = "Mathematics";
        Cours existingCours = new Cours();
        existingCours.setNomCours(coursName);

        // Créer un cours simulé avec des modifications
        Cours updatedCours = new Cours();
        updatedCours.setNomCours(coursName);
        updatedCours.setDescription("Advanced Mathematics");

        // Définir le comportement simulé du repository pour vérifier l'existence du cours
        when(coursRepository.existsById(coursName)).thenReturn(true);

        // Définir le comportement simulé du repository pour mettre à jour le cours
        when(coursRepository.save(updatedCours)).thenReturn(updatedCours);

        // Appeler la méthode à tester
        Cours result = coursService.updateCours(coursName, updatedCours);

        // Vérifier que le cours retourné correspond au cours mis à jour
        assertEquals(updatedCours, result);
    }

    @Test
    void deleteCours_DeletesExistingCours() {
        // Créer un nom de cours simulé
        String coursName = "Mathematics";

        // Définir le comportement simulé du repository pour vérifier l'existence du cours
        when(coursRepository.existsById(coursName)).thenReturn(true);

        // Appeler la méthode à tester
        coursService.deleteCours(coursName);

        // Vérifier que la méthode de suppression a été appelée avec le nom de cours simulé
        verify(coursRepository, times(1)).deleteById(coursName);
    }




    @Test
    void getCoursBySessionId_ReturnsCoursWithGivenSessionId() {
        // Créer un ID de session simulé
        Long sessionId = 123L;

        // Créer un cours simulé
        Cours cours = new Cours();

        // Définir le comportement simulé du repository pour rechercher le cours par ID de session
        when(coursRepository.findBySessionsIdSession(sessionId)).thenReturn(cours);

        // Appeler la méthode à tester
        Cours result = coursService.getCoursBySessionId(sessionId);

        // Vérifier que le cours retourné correspond au cours simulé
        assertEquals(cours, result);
    }

    @Test
    void getCoursByProfesseurId_ReturnsListOfCoursForGivenProfesseurId() {
        // Créer un ID de professeur simulé
        Long professeurId = 456L;

        // Créer une liste de cours simulée
        List<Cours> coursList = new ArrayList<>();

        // Ajouter des cours simulés à la liste
        Cours cours1 = new Cours();
        cours1.setNomCours("Mathematics");
        cours1.setIdProfesseur(professeurId);
        coursList.add(cours1);

        Cours cours2 = new Cours();
        cours2.setNomCours("Physics");
        cours2.setIdProfesseur(professeurId);
        coursList.add(cours2);

        // Définir le comportement simulé du repository pour rechercher les cours par ID de professeur
        when(coursRepository.findByIdProfesseur(professeurId)).thenReturn(coursList);

        // Appeler la méthode à tester
        List<Cours> result = coursService.getCoursByProfesseurId(professeurId);

        // Vérifier que la liste de cours retournée correspond à la liste simulée
        assertEquals(coursList, result);
    }



}