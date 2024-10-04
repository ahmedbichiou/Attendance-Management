package com.enicarthage.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.enicarthage.entities.User;
import com.enicarthage.repositories.UserRepository;

@Service
public class EmailService {
	
	    @Autowired
	    private JavaMailSender mailSender;

	    @Autowired
	    private UserRepository userRepository; // Your user repository

	    public boolean sendEmailNotif(String email) {
	        Optional<User> optionalUser = userRepository.findByEmail(email); // This returns an Optional
	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get(); // Get the User object if present
	            sendEmailElim(user);
	            return true;
	        }
	        return false;
	    }
	    
	    public boolean sendEmailAbs(String email) {
	        Optional<User> optionalUser = userRepository.findByEmail(email); // This returns an Optional
	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get(); // Get the User object if present
	            sendEmailAbsence(user);
	            return true;
	        }
	        return false;
	    }
	    
	    private void sendEmailElim(User user) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("noreply@example.com");
	        message.setTo(user.getEmail());
	        message.setSubject("Notification");
	        message.setText("Vous avez depassé le nombre maximal d'absence veuillez consultez l'administration dans les plus prochaines délais" );
	        mailSender.send(message);
	    }
	    
	    private void sendEmailAbsence(User user) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setFrom("noreply@example.com");
	        message.setTo(user.getEmail());
	        message.setSubject("Notification");
	        message.setText("Vous avez une nouvelle absence" );
	        mailSender.send(message);
	    }
	


}
