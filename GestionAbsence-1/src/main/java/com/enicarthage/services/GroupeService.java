package com.enicarthage.services;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Groupe;
import com.enicarthage.repositories.GroupeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class GroupeService {

    @Autowired
    private GroupeRepository groupeRepository;

    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    public Groupe getGroupeByNom(String nom) {
        return groupeRepository.findByNom(nom);
    }

    public Groupe createGroupe(Groupe groupe) {
        // Set the group for each etudiant
    	if(groupe.getEtudiants() != null)
        groupe.getEtudiants().forEach(etudiant -> etudiant.setGroup(groupe));
        return groupeRepository.save(groupe);
    }

    public void deleteGroupe(String nom) {
        Groupe groupe = groupeRepository.findByNom(nom);
        if (groupe != null) {
            groupeRepository.delete(groupe);
        }
    }
    
    public List<Etudiant> getStudentsByGroup(String groupName) {
        Groupe group = groupeRepository.findByNom(groupName);
        if (group != null) {
            return group.getEtudiants();
        }
        return Collections.emptyList(); // Return empty list if group not found
    }
}
