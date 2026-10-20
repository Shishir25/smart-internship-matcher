package com.sim.backend.service;
import com.sim.backend.exception.ResourceNotFoundException;
import com.sim.backend.matching.MatchingEngineService;
import com.sim.backend.model.Internship;
import com.sim.backend.model.MatchResult;
import com.sim.backend.model.StudentProfile;
import com.sim.backend.repository.InternshipRepository;
import com.sim.backend.repository.MatchResultRepository;
import com.sim.backend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MatchService {
    private final StudentProfileRepository studentRepo;
    private final InternshipRepository internshipRepo;
    private final MatchResultRepository matchRepo;
    private final MatchingEngineService engine;

    public MatchService(StudentProfileRepository studentRepo, InternshipRepository internshipRepo, MatchResultRepository matchRepo, MatchingEngineService engine) {
        this.studentRepo = studentRepo; this.internshipRepo = internshipRepo; this.matchRepo = matchRepo; this.engine = engine;
    }

    public MatchResult analyzeMatch(String internshipId) {
        StudentProfile student = studentRepo.findById("student-1").orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Internship internship = internshipRepo.findById(internshipId).orElseThrow(() -> new ResourceNotFoundException("Internship not found"));
        MatchResult result = engine.evaluateMatch(student, internship);
        matchRepo.findByStudentProfileIdAndInternshipId(student.getId(), internshipId).ifPresent(existing -> result.setId(existing.getId()));
        return matchRepo.save(result);
    }

    public List<MatchResult> getRankedRecommendations() {
        StudentProfile student = studentRepo.findById("student-1").orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        List<Internship> internships = internshipRepo.findAll();
        for (Internship i : internships) {
            MatchResult res = engine.evaluateMatch(student, i);
            matchRepo.findByStudentProfileIdAndInternshipId(student.getId(), i.getId()).ifPresent(existing -> res.setId(existing.getId()));
            matchRepo.save(res);
        }
        return matchRepo.findByStudentProfileIdOrderByOverallScoreDesc(student.getId());
    }
}