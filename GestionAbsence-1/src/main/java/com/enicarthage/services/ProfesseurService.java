package com.enicarthage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Professeur;

import com.enicarthage.repositories.ProfesseurRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesseurService implements IProfesseurService{
    @Autowired
    ProfesseurRepository professeurRepository;
    
    public ProfesseurService(ProfesseurRepository professeurRepository) {
        this.professeurRepository = professeurRepository;
    }
    
    public List<Professeur> findAllProfesseurs() {
        return (List<Professeur>) professeurRepository.findAll();
    }

  
  
    public Optional<Professeur> findProfesseurById(Long id) {
        return professeurRepository.findById(id);
    }
  

    public Professeur saveProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }

    public Professeur updateProfesseur(Long id, Professeur professeurDetails) {
        // First, find the existing professeur by ID
        Professeur professeur = professeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professeur not found with id " + id));

        // Update the professeur details
        professeur.setNom(professeurDetails.getNom());
        professeur.setPrenom(professeurDetails.getPrenom());
        professeur.setDepartement(professeurDetails.getDepartement());
        professeur.setIdUser(professeurDetails.getIdUser());
        professeur.setGroupes(professeurDetails.getGroupes());

        // Save the updated professeur back to the database
        return professeurRepository.save(professeur);
    }
    public List<Professeur> findProfesseurDetailsByIdUser(Long idUser) {
        return professeurRepository.findByIdUser(idUser);
    }

    public void deleteProfesseur(Long id) {
        Professeur professeur = professeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professeur not found with id " + id));
        professeurRepository.delete(professeur);
    }


}
