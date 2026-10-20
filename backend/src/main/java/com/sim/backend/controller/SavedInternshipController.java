package com.sim.backend.controller;
import com.sim.backend.model.SavedInternship;
import com.sim.backend.repository.SavedInternshipRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/saved-internships")
public class SavedInternshipController {
    private final SavedInternshipRepository repo;
    public SavedInternshipController(SavedInternshipRepository repo) { this.repo = repo; }
    @GetMapping
    public ResponseEntity<List<SavedInternship>> getSaved() { return ResponseEntity.ok(repo.findByStudentProfileId("student-1")); }
    @PostMapping("/{internshipId}")
    public ResponseEntity<SavedInternship> toggleSave(@PathVariable String internshipId, @RequestParam(required = false) String notes) {
        var existing = repo.findByStudentProfileIdAndInternshipId("student-1", internshipId);
        if (existing.isPresent()) { repo.delete(existing.get()); return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); }
        SavedInternship saved = new SavedInternship("student-1", internshipId, notes != null ? notes : "Shortlisted role");
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(saved));
    }
}