package com.sim.backend.repository;
import com.sim.backend.model.SavedInternship;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;
public interface SavedInternshipRepository extends MongoRepository<SavedInternship, String> {
    List<SavedInternship> findByStudentProfileId(String studentProfileId);
    Optional<SavedInternship> findByStudentProfileIdAndInternshipId(String studentProfileId, String internshipId);
}
