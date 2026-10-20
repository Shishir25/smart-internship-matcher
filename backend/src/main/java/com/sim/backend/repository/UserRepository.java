package com.sim.backend.repository;
import com.sim.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User, String> {}
