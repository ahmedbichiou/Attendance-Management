package com.enicarthage.services;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.enicarthage.entities.User;
import com.enicarthage.repositories.UserRepository;

@Service
public class PasswordResetService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository; // Your user repository

    public boolean requestPasswordReset(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email); // This returns an Optional
        if (optionalUser.isPresent()) {
            User user = optionalUser.get(); // Get the User object if present
            sendResetEmail(user);
            return true;
        }
        return false;
    }


/*    private void sendResetEmail(User user) {
        String token = generateToken(); // Implement token genertion logic
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@example.com");
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" + "http://localhost:4200/?token=" + token);
        mailSender.send(message);
    }*/
    
    private void sendResetEmail(User user) {
        String token = generateToken();
        user.setResetToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusHours(24)); // Token expires in 24 hours
        userRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@example.com");
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" + "http://localhost:4200/reset-password?token=" + token);
        mailSender.send(message);
    }


    private String generateToken() {
        // Generate a random token. For example:
        return UUID.randomUUID().toString();
    }
}

