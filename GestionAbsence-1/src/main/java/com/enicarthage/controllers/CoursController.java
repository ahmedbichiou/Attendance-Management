package com.enicarthage.controllers;

import com.enicarthage.entities.Cours;
import com.enicarthage.entities.Professeur;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.services.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cours")
@CrossOrigin(origins = "*")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @GetMapping
    public ResponseEntity<List<Cours>> getAllCours() {
        List<Cours> coursList = coursService.getAllCours();
        return new ResponseEntity<>(coursList, HttpStatus.OK);
    }

    @GetMapping("/{nomCours}")
    public ResponseEntity<Cours> getCoursByNom(@PathVariable String nomCours) {
        Cours cours = coursService.getCoursByNom(nomCours);
        if (cours != null) {
            return new ResponseEntity<>(cours, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(consumes = {"application/json"})
    public ResponseEntity<Cours> createCours(@RequestBody Cours cours) {
        Cours createdCours = coursService.createCours(cours);
        return new ResponseEntity<>(createdCours, HttpStatus.CREATED);
    }

    @PutMapping("/{nomCours}")
    public ResponseEntity<Cours> updateCours(@PathVariable String nomCours, @RequestBody Cours cours) {
        Cours updatedCours = coursService.updateCours(nomCours, cours);
        if (updatedCours != null) {
            return new ResponseEntity<>(updatedCours, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{nomCours}")
    public ResponseEntity<Void> deleteCours(@PathVariable String nomCours) {
        coursService.deleteCours(nomCours);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{nomCours}/sessions")
    public ResponseEntity<SessionCours> addSessionCours(@PathVariable String nomCours, @RequestBody SessionCours sessionCours) {
        SessionCours addedSessionCours = coursService.addSessionCours(nomCours, sessionCours);
        return new ResponseEntity<>(addedSessionCours, HttpStatus.CREATED);
    }
    
    @GetMapping("/bySessionId/{sessionId}")
    public ResponseEntity<Cours> getCoursBySessionId(@PathVariable Long sessionId) {
        Cours cours = coursService.getCoursBySessionId(sessionId);
        if (cours != null) {
            return new ResponseEntity<>(cours, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/byProfesseurId/{professeurId}")
    public ResponseEntity<List<Cours>> getCoursByProfesseurId(@PathVariable Long professeurId) {
        List<Cours> coursList = coursService.getCoursByProfesseurId(professeurId);
        return new ResponseEntity<>(coursList, HttpStatus.OK);
    }
    
    @GetMapping("/professeur/{nomCours}")
    public ResponseEntity<Professeur> getProfesseurByNomCours(@PathVariable String nomCours) {
        Professeur professeur = coursService.getProfesseurByNomCours(nomCours);
        if (professeur != null) {
            return new ResponseEntity<>(professeur, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/{nomCours}/sessions")
    public ResponseEntity<List<SessionCours>> getSessionCoursByNomCours(@PathVariable String nomCours) {
        List<SessionCours> sessionCoursList = coursService.getSessionCoursByNomCours(nomCours);
        if (sessionCoursList != null && !sessionCoursList.isEmpty()) {
            return new ResponseEntity<>(sessionCoursList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
