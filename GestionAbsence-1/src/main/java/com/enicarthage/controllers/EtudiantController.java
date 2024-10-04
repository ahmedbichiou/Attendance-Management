package com.enicarthage.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.enicarthage.entities.*;
import com.enicarthage.services.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping
public class EtudiantController {

    private final EtudiantService etudiantService;
    
    @Autowired
    private EmailService emailService;

    public EtudiantController(EtudiantService etudiantService) {
        this.etudiantService = etudiantService;
    }

    @GetMapping("/etudiants")
    public List<Etudiant> getAllEtudiants() {
        return etudiantService.findAllEtudiants();
    }
    
    @PostMapping("/notifierEtudiantElim")
    public ResponseEntity<String> sendEmailElim(@RequestBody Map<String, Long> payload) {
        Long idEtud = payload.get("idEtud");
        Optional<String> emailOpt = etudiantService.findEmailByEtudiantId(idEtud);

        if (emailOpt.isPresent()) {
            boolean result = emailService.sendEmailNotif(emailOpt.get());
            if (result) {
                return ResponseEntity.ok("Email was sent successfully.");
            } else {
                return ResponseEntity.badRequest().body("Failed to send email.");
            }
        } else {
            return ResponseEntity.badRequest().body("Student or email not found");
        }
    }

    
    @PostMapping("/notifierEtudiantAbs")
    public ResponseEntity<String> sendEmailAbs(@RequestBody Map<String, Long> payload) {
        Long idEtud = payload.get("idEtud");
        Optional<String> emailOpt = etudiantService.findEmailByEtudiantId(idEtud);

        if (emailOpt.isPresent()) {
            boolean result = emailService.sendEmailAbs(emailOpt.get());
            if (result) {
                return ResponseEntity.ok("Email was sent successfully.");
            } else {
                return ResponseEntity.badRequest().body("Failed to send email.");
            }
        } else {
            return ResponseEntity.badRequest().body("Student or email not found");
        }
    }


    @GetMapping("/etudiants/{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable Long id) {
        return etudiantService.findEtudiantById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/etudiants")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
        return etudiantService.saveEtudiant(etudiant);
    }

    @PutMapping("/etudiants/{id}")
    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiantDetails) {
        Etudiant updatedEtudiant = etudiantService.updateEtudiant(id, etudiantDetails);
        return ResponseEntity.ok(updatedEtudiant);
    }

    @DeleteMapping("/etudiants/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
        return ResponseEntity.ok().build();
    }
}
