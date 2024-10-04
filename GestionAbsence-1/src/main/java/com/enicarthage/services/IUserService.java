package com.enicarthage.services;

import java.util.List;
import java.util.Optional;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.User;

public interface IUserService {
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();
    void deleteUser(Long id);
	User updateUser(User user, Long id);
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
	public Etudiant saveEtudiant(Etudiant etudiant);
}
