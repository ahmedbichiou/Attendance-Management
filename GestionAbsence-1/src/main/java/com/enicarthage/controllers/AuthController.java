package com.enicarthage.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.enicarthage.config.JwtUtil;
import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Professeur;
import com.enicarthage.entities.User;
import com.enicarthage.entities.DTOs.LoginRequestDTO;
import com.enicarthage.entities.DTOs.PasswordResetDTO;
import com.enicarthage.entities.DTOs.SignUpRequest;
import com.enicarthage.entities.DTOs.UpdateUserDTO;
import com.enicarthage.repositories.UserRepository;
import com.enicarthage.services.EtudiantService;
import com.enicarthage.services.PasswordResetService;
import com.enicarthage.services.ProfesseurService;
import com.enicarthage.services.UserService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private ProfesseurService professeurService;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
        if (userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    
    @Autowired
    private PasswordResetService passwordResetService;
    
    @PostMapping("/requestReset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        boolean result = passwordResetService.requestPasswordReset(email);
        if (result) {
            return ResponseEntity.ok("Password reset email sent.");
        } else {
            return ResponseEntity.badRequest().body("Email address not found.");
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        if (userService.findByUsername(signUpRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userService.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(signUpRequest.getPassword());  // Ensure password is hashed
        user.setEmail(signUpRequest.getEmail());
        user.setRole(signUpRequest.getRole());
        userService.saveUser(user);

        switch (signUpRequest.getRole()) {
            case ÉTUDIANT:
                Etudiant etudiant = new Etudiant();
                etudiant.setIdUser(user.getIdUser());
                etudiant.setNom(signUpRequest.getNom());
                etudiant.setPrenom(signUpRequest.getPrenom());
                etudiant.setNumeroTel(signUpRequest.getNumeroTel());
                etudiant.setGroup(signUpRequest.getGroupe());
                userService.saveEtudiant(etudiant);
                break;
            case PROFESSEUR:
                Professeur professeur = new Professeur();
                professeur.setIdUser(user.getIdUser());
                professeur.setNom(signUpRequest.getNom());
                professeur.setPrenom(signUpRequest.getPrenom());
                professeur.setDepartement(signUpRequest.getDepartement());
                userService.saveProfesseur(professeur);
                break;
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(token);
    }
    
    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestBody PasswordResetDTO passwordResetDTO) {
        if (!passwordResetDTO.getNewPassword().equals(passwordResetDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("New password and confirm password do not match.");
        }

        Optional<User> userOptional = userRepository.findByResetToken(token);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        User user = userOptional.get();
        if (user.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token expired");
        }

        // Update the password (make sure to hash the password before saving)
        user.setPassword(passwordResetDTO.getNewPassword());  // Assuming passwordEncoder is an instance of a password hashing service
        user.setResetToken(null);  // Clear the reset token
        user.setTokenExpirationDate(null);  // Clear the token expiration
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }

    
    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO) {
        try {
            // Check if the user exists
            User user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
            
            // Check if the username or email has been changed to one that already exists
            if (!user.getUsername().equals(updateUserDTO.getUsername()) && userService.findByUsername(updateUserDTO.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("Username is already taken");
            }
            if (!user.getEmail().equals(updateUserDTO.getEmail()) && userService.findByEmail(updateUserDTO.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email is already registered");
            }

            // Update general user information
            user.setUsername(updateUserDTO.getUsername());
            user.setEmail(updateUserDTO.getEmail());
            // Ensure you handle password changes or validations here as well

            userService.saveUser(user);

            // Update role-specific information
            switch (user.getRole()) {
                case ÉTUDIANT:
                    List<Etudiant> etudiants = etudiantService.findEtudiantDetailsByIdUser(user.getIdUser());
                    Etudiant etudiant = etudiants.get(0);
                    etudiant.setNom(updateUserDTO.getNom());
                    etudiant.setPrenom(updateUserDTO.getPrenom());
                    etudiant.setNumeroTel(updateUserDTO.getNumeroTel());
                    userService.saveEtudiant(etudiant);
                    break;
                case PROFESSEUR:
                    List<Professeur> professeurs = professeurService.findProfesseurDetailsByIdUser(user.getIdUser());
                    Professeur professeur = professeurs.get(0);
                    professeur.setNom(updateUserDTO.getNom());
                    professeur.setPrenom(updateUserDTO.getPrenom());
                    professeur.setDepartement(updateUserDTO.getDepartement());
                    userService.saveProfesseur(professeur);
                    break;
            }

            // Generate a new JWT token for the updated user
            String newToken = jwtUtil.generateToken(user.getUsername());

            // Return the new token along with the response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            response.put("token", newToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.getUsernameFromToken(token);
                User user = userService.findByUsername(username).orElseThrow(() -> new RuntimeException("No User found with this username"));

                // Create a map to hold the user details along with the email
                Map<String, Object> response = new HashMap<>();
                response.put("idUser", user.getIdUser());
                response.put("username", user.getUsername()); 
                response.put("email", user.getEmail()); // Always include the email

                switch (user.getRole()) {
                    case ÉTUDIANT:
                        List<Etudiant> etudiants = etudiantService.findEtudiantDetailsByIdUser(user.getIdUser());
                        if (etudiants.size() == 1) {
                            Etudiant etudiant = etudiants.get(0);
                            // Adding student specific details to the response
                            response.put("role", "ÉTUDIANT");
                            response.put("nom", etudiant.getNom());
                            response.put("prenom", etudiant.getPrenom());
                            response.put("numeroTel", etudiant.getNumeroTel());
                            //response.put("groupe", etudiant.getGroup().getNom());
                            return ResponseEntity.ok(response);
                        } else if (etudiants.isEmpty()) {
                            return ResponseEntity.notFound().build();
                        } else {
                            return ResponseEntity.status(HttpStatus.CONFLICT).body("Multiple student records found for user ID.");
                        }
                    case PROFESSEUR:
                        List<Professeur> professeurs = professeurService.findProfesseurDetailsByIdUser(user.getIdUser());
                        if (professeurs.size() == 1) {
                            Professeur professeur = professeurs.get(0);
                            // Adding professor specific details to the response
                            response.put("role", "PROFESSEUR");
                            response.put("nom", professeur.getNom());
                            response.put("prenom", professeur.getPrenom());
                            response.put("departement", professeur.getDepartement());
                            return ResponseEntity.ok(response);
                        } else if (professeurs.isEmpty()) {
                            return ResponseEntity.notFound().build();
                        } else {
                            return ResponseEntity.status(HttpStatus.CONFLICT).body("Multiple professor records found for user ID.");
                        }
                    case ADMINISTRATEUR:
                        // Admins might not need extra details beyond email
                        response.put("role", "ADMINISTRATEUR");
                        return ResponseEntity.ok(response);
                    default:
                        return ResponseEntity.badRequest().body("Role is not recognized");
                }
            }
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
    

    

}
