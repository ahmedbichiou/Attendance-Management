package com.enicarthage.controllers;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Groupe;
import com.enicarthage.services.GroupeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/groupes")
@CrossOrigin(origins = "*")
public class GroupeController {

    @Autowired
    private GroupeService groupeService;

    @GetMapping
    public List<Groupe> getAllGroupes() {
        return groupeService.getAllGroupes();
    }

    @GetMapping("/{nom}")
    public Groupe getGroupeByNom(@PathVariable String nom) {
        return groupeService.getGroupeByNom(nom);
    }

    @PostMapping
    public Groupe createGroupe(@RequestBody Groupe groupe) {
        return groupeService.createGroupe(groupe);
    }

    @DeleteMapping("/{nom}")
    public void deleteGroupe(@PathVariable String nom) {
        groupeService.deleteGroupe(nom);
    }
    
    @GetMapping("/{nom}/students")
    public List<Etudiant> getStudentsByGroup(@PathVariable String nom) {
        return groupeService.getStudentsByGroup(nom);
    }
}
