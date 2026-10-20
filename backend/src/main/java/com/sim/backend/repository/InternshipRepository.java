package com.sim.backend.repository;
import com.sim.backend.model.Internship;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface InternshipRepository extends MongoRepository<Internship, String> {}
