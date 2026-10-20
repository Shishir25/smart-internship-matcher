package com.sim.backend.controller;
import com.sim.backend.model.ApplicationTracking;
import com.sim.backend.repository.ApplicationTrackingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationTrackingController {
    private final ApplicationTrackingRepository repo;
    public ApplicationTrackingController(ApplicationTrackingRepository repo) { this.repo = repo; }
    @GetMapping
    public ResponseEntity<List<ApplicationTracking>> getApplications() { return ResponseEntity.ok(repo.findByStudentProfileIdOrderByUpdatedAtDesc("student-1")); }
    @PostMapping
    public ResponseEntity<ApplicationTracking> trackApplication(@RequestBody ApplicationTracking incoming) {
        incoming.setStudentProfileId("student-1"); incoming.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(incoming));
    }
}