package com.sim.backend.controller;
import com.sim.backend.model.MatchResult;
import com.sim.backend.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    private final MatchService service;
    public MatchController(MatchService service) { this.service = service; }

    @PostMapping("/analyze/{internshipId}")
    public ResponseEntity<MatchResult> analyze(@PathVariable String internshipId) {
        return ResponseEntity.ok(service.analyzeMatch(internshipId));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<MatchResult>> getRecommendations() {
        return ResponseEntity.ok(service.getRankedRecommendations());
    }
}