package com.sim.backend.controller;

import com.sim.backend.repository.InternshipRepository;
import com.sim.backend.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/foundation")
public class FoundationController {
    private final StudentProfileRepository studentProfileRepository;
    private final InternshipRepository internshipRepository;

    public FoundationController(StudentProfileRepository studentProfileRepository,
                                InternshipRepository internshipRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.internshipRepository = internshipRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getFoundationStatus() {
        var profiles = studentProfileRepository.findAll();
        var internships = internshipRepository.findAll();
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("service", "Smart Internship Matcher API");
        payload.put("phase", "Phase 1 - Foundation Ready");
        payload.put("databaseConnected", true);
        payload.put("studentProfile", profiles.isEmpty() ? null : profiles.get(0));
        payload.put("sampleInternships", internships);
        return ResponseEntity.ok(payload);
    }
}
