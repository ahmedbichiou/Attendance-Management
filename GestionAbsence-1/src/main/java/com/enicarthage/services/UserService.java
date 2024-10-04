package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Professeur;
import com.enicarthage.entities.User;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.repositories.ProfesseurRepository;
import com.enicarthage.repositories.UserRepository;

@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final EtudiantRepository etudiantRepository;
    private final ProfesseurRepository professeurRepository;

    // This method simulates user authentication against a database
    /*public boolean authenticate(String username, String password) {
        // For demonstration purposes, this authentication just checks hardcoded values
        return "us".equals(username) && "ps".equals(password);
    }*/
    public boolean authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    @Autowired
    public UserService(UserRepository userRepository, EtudiantRepository etudiantRepository, ProfesseurRepository professeurRepository) {
        this.userRepository = userRepository;
		this.etudiantRepository = etudiantRepository;
		this.professeurRepository = professeurRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, Long id) {
    	User userToUpdate = userRepository.findById(id).orElse(null);
    	if(userToUpdate!=null){
        	userToUpdate.setUsername(user.getUsername());
        	userToUpdate.setPassword(user.getPassword());
        	userToUpdate.setRole(user.getRole());
        	userToUpdate.setEmail(user.getEmail());
    	}
        return userRepository.save(userToUpdate); // save method works for both save and update
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);	
	}
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    public Etudiant saveEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }
    public Professeur saveProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }

	
}