package com.sim.backend.repository;

import com.sim.backend.model.MatchResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchResultRepository extends MongoRepository<MatchResult, String> {
    List<MatchResult> findByStudentProfileId(String studentProfileId);
    List<MatchResult> findByStudentProfileIdOrderByOverallScoreDesc(String studentProfileId);
    Optional<MatchResult> findByStudentProfileIdAndInternshipId(String studentProfileId, String internshipId);
}