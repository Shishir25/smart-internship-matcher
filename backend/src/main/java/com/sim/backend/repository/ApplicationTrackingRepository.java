package com.sim.backend.repository;
import com.sim.backend.model.ApplicationTracking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface ApplicationTrackingRepository extends MongoRepository<ApplicationTracking, String> {
    List<ApplicationTracking> findByStudentProfileIdOrderByUpdatedAtDesc(String studentProfileId);
}
