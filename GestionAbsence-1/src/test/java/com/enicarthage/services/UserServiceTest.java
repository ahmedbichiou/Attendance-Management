package com.enicarthage.services;

import com.enicarthage.entities.Etudiant;
import com.enicarthage.entities.Professeur;
import com.enicarthage.entities.User;
import com.enicarthage.repositories.EtudiantRepository;
import com.enicarthage.repositories.ProfesseurRepository;
import com.enicarthage.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;



    @InjectMocks
    private UserService userService;




    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void saveUser() {
        User user = new User();
        user.setIdUser(1L);
        user.setUsername("testUser");
        user.setPassword("testPassword");
        user.setRole(User.Role.ÉTUDIANT);
        user.setEmail("test@example.com");

        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.saveUser(user);

        assertNotNull(savedUser);
        assertEquals(user.getUsername(), savedUser.getUsername());
    }

    @Test
    void getUserById() {
        User user = new User();
        user.setIdUser(1L);
        user.setUsername("testUser");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserById(1L);

        assertTrue(foundUser.isPresent());
        assertEquals(user.getUsername(), foundUser.get().getUsername());
    }

    @Test
    void getAllUsers() {
        List<User> userList = new ArrayList<>();
        userList.add(new User());
        userList.add(new User());

        when(userRepository.findAll()).thenReturn(userList);

        List<User> foundUsers = userService.getAllUsers();

        assertEquals(2, foundUsers.size());
    }

    @Test
    void updateUser() {
        User existingUser = new User();
        existingUser.setIdUser(1L);
        existingUser.setUsername("existingUser");

        User updatedUser = new User();
        updatedUser.setIdUser(1L);
        updatedUser.setUsername("updatedUser");

        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(updatedUser);

        User result = userService.updateUser(updatedUser, 1L);

        assertNotNull(result);
        assertEquals(updatedUser.getUsername(), result.getUsername());
    }

    @Test
    void findByEmail() {
        User user = new User();
        user.setIdUser(1L);
        user.setEmail("test@example.com");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findByEmail("test@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals(user.getEmail(), foundUser.get().getEmail());
    }

    @Test
    void findByUsername() {
        User user = new User();
        user.setIdUser(1L);
        user.setUsername("testUser");

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findByUsername("testUser");

        assertTrue(foundUser.isPresent());
        assertEquals(user.getUsername(), foundUser.get().getUsername());
    }









}
