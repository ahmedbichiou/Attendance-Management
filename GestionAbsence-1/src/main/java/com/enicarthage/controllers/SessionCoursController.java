package com.enicarthage.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.enicarthage.entities.SessionCours;
import com.enicarthage.services.SessionCoursService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/sessionCours")
public class SessionCoursController {

    private final SessionCoursService sessionCoursService;

    public SessionCoursController(SessionCoursService sessionCoursService) {
        this.sessionCoursService = sessionCoursService;
    }

    @GetMapping
    public List<SessionCours> getAllSessionCours() {
        return sessionCoursService.findAllSessionCours();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionCours> getSessionCoursById(@PathVariable Long id) {
        return sessionCoursService.findSessionCoursById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public SessionCours createSessionCours(@RequestBody SessionCours sessionCours) {
        return sessionCoursService.saveSessionCours(sessionCours);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SessionCours> updateSessionCours(@PathVariable Long id, @RequestBody SessionCours sessionCoursDetails) {
        SessionCours updatedSessionCours = sessionCoursService.updateSessionCours(id, sessionCoursDetails);
        return ResponseEntity.ok(updatedSessionCours);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSessionCours(@PathVariable Long id) {
        sessionCoursService.deleteSessionCours(id);
        return ResponseEntity.ok().build();
    }
}
