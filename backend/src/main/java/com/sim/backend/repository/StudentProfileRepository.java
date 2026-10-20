package com.sim.backend.repository;
import com.sim.backend.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {}
