package com.enicarthage.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.enicarthage.entities.Absence;
import com.enicarthage.services.AbsenceService;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController

@RequestMapping("/absences")
public class AbsenceController {

    private final AbsenceService absenceService;

    public AbsenceController(AbsenceService absenceService) {
        this.absenceService = absenceService;
    }

    @GetMapping
    public List<Absence> getAllAbsences() {
        return absenceService.findAllAbsences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Absence> getAbsenceById(@PathVariable Long id) {
        return absenceService.findAbsenceById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {"application/json"})
    public Absence createAbsence(@RequestBody Absence absence) {
        return absenceService.addAbsence(absence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Absence> updateAbsence(@PathVariable Long id, @RequestBody Absence absenceDetails) {
        Absence updatedAbsence = absenceService.updateAbsence(id, absenceDetails);
        return ResponseEntity.ok(updatedAbsence);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long id) {
        absenceService.deleteAbsence(id);
        return ResponseEntity.ok().build();
        
    }
    
    @GetMapping("/etudiant/{etudiantId}")
    public List<Absence> getAbsencesByEtudiant(@PathVariable Long etudiantId) {
        return absenceService.findAbsencesByEtudiantId(etudiantId);
    }
    

}
