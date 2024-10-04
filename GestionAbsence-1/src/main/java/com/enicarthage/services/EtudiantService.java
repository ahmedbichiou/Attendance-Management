package com.enicarthage.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.entities.Etudiant;
import com.enicarthage.repositories.GroupeRepository;
import com.enicarthage.repositories.UserRepository;
import com.enicarthage.entities.Groupe;
import com.enicarthage.entities.User;

@Service
public class EtudiantService implements IEtudiantService{

    @Autowired
    private EtudiantRepository etudiantRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupeRepository groupeRepository;

    public List<Etudiant> findAllEtudiants() {
        return etudiantRepository.findAll();
    }

    public Optional<Etudiant> findEtudiantById(Long id) {
        return etudiantRepository.findById(id);
    }
    
    public Optional<String> findEmailByEtudiantId(Long idEtud) {
        return etudiantRepository.findById(idEtud)
                                 .map(Etudiant::getIdUser) // Get idUser from the Etudiant
                                 .flatMap(userRepository::findById) // Find the User by idUser
                                 .map(User::getEmail); // Get email from User
    }
    public Etudiant saveEtudiant(Etudiant etudiant) {
        if (etudiant.getGroup() == null || etudiant.getGroup().getNom() == null) {
            throw new IllegalArgumentException("Etudiant must have a valid group associated with it");
        }

        Groupe groupe = groupeRepository.findByNom(etudiant.getGroup().getNom());
        if (groupe == null) {
            throw new IllegalArgumentException("Group with name " + etudiant.getGroup().getNom() + " not found");
        }

        etudiant.setGroup(groupe);
        return etudiantRepository.save(etudiant);
    }

    public List<Etudiant> findEtudiantDetailsByIdUser(Long idUser) {
        return etudiantRepository.findByIdUser(idUser);
    }

    public Etudiant updateEtudiant(Long id, Etudiant etudiantDetails) {
        Etudiant etudiant = etudiantRepository.findById(id).orElseThrow(() -> new RuntimeException("Etudiant not found with id " + id));
        etudiant.setNom(etudiantDetails.getNom());
        etudiant.setPrenom(etudiantDetails.getPrenom());
        etudiant.setNumeroTel(etudiantDetails.getNumeroTel());
        if (etudiantDetails.getGroup() != null && etudiantDetails.getGroup().getNom() != null) {
            etudiant.setGroup(etudiantDetails.getGroup());
        }
        return etudiantRepository.save(etudiant);
    }

    public void deleteEtudiant(Long id) {
        Etudiant etudiant = etudiantRepository.findById(id).orElseThrow(() -> new RuntimeException("Etudiant not found with id " + id));
        etudiantRepository.delete(etudiant);
    }
}
