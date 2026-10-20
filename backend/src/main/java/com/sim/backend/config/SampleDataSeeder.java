package com.sim.backend.config;

import com.sim.backend.model.Internship;
import com.sim.backend.model.Internship.EducationRequirement;
import com.sim.backend.model.StudentProfile;
import com.sim.backend.model.StudentProfile.*;
import com.sim.backend.model.User;
import com.sim.backend.model.enums.WorkMode;
import com.sim.backend.repository.InternshipRepository;
import com.sim.backend.repository.StudentProfileRepository;
import com.sim.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
public class SampleDataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final InternshipRepository internshipRepository;

    public SampleDataSeeder(UserRepository userRepository,
                            StudentProfileRepository studentProfileRepository,
                            InternshipRepository internshipRepository) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.internshipRepository = internshipRepository;
    }

    @Override
    public void run(String... args) {
        if (studentProfileRepository.count() == 0) {
            User user = new User("user-1", "Shishir Singh", "singhshishir2525@gmail.com", "demo_hash", "STUDENT");
            userRepository.save(user);

            StudentProfile profile = new StudentProfile();
            profile.setId("student-1");
            profile.setUserId(user.getId());
            profile.setFullName("Shishir Singh");
            profile.setEmail("singhshishir2525@gmail.com");
            profile.setHeadline("B.Tech CSE Graduate | Java, Spring Boot, React.js & MongoDB Developer");
            profile.setCurrentLocation("Bangalore");
            profile.setGithubUrl("https://github.com/singhshishir2525");
            profile.setEducation(List.of(new EducationEntry("B.Tech", "Computer Science and Engineering", "Bundelkhand University", 2026, 7.52)));
            profile.setSkills(List.of(
                new SkillItem("Java", "LANGUAGE", "ADVANCED"),
                new SkillItem("Spring Boot", "FRAMEWORK", "ADVANCED"),
                new SkillItem("React.js", "FRAMEWORK", "INTERMEDIATE"),
                new SkillItem("MongoDB", "DATABASE", "INTERMEDIATE"),
                new SkillItem("MySQL", "DATABASE", "INTERMEDIATE"),
                new SkillItem("REST APIs", "FRAMEWORK", "ADVANCED"),
                new SkillItem("JavaScript", "LANGUAGE", "INTERMEDIATE"),
                new SkillItem("SQL", "LANGUAGE", "INTERMEDIATE"),
                new SkillItem("Git", "TOOL", "INTERMEDIATE"),
                new SkillItem("Postman", "TOOL", "ADVANCED")
            ));
            profile.setProjects(List.of(
                new ProjectItem("Movie Review Application", "Full-stack movie review platform using Spring Boot, React.js, and MongoDB.", List.of("Java", "Spring Boot", "React.js", "MongoDB", "REST APIs"), "Full-Stack Development", "https://github.com/singhshishir2525"),
                new ProjectItem("Banking Management System", "Core banking backend supporting account creation and fund transfers.", List.of("Java", "Spring Boot", "MySQL", "REST APIs"), "Backend Engineering", "https://github.com/singhshishir2525")
            ));
            profile.setAvailableDurationMonths(6);
            studentProfileRepository.save(profile);
        }

        if (internshipRepository.count() == 0) {
            Internship i1 = new Internship();
            i1.setId("intern-101");
            i1.setTitle("Full-Stack Software Engineering Intern (Java & React)");
            i1.setCompany("CloudForge Systems (Sample)");
            i1.setRoleCategory("Full-Stack Development");
            i1.setDescription("Build customer-facing modules using React.js and Java Spring Boot REST APIs backed by MongoDB.");
            i1.setRequiredSkills(List.of("Java", "Spring Boot", "React.js", "MongoDB", "REST APIs", "Git"));
            i1.setPreferredSkills(List.of("Docker", "Postman", "Maven"));
            i1.setEducationRequirement(new EducationRequirement(List.of("B.Tech"), List.of("Computer Science and Engineering"), List.of(2025, 2026), 7.0, true, true, true));
            i1.setLocation("Bangalore");
            i1.setWorkMode(WorkMode.HYBRID);
            i1.setDurationMonths(6);
            i1.setStipendPerMonth(35000);
            i1.setDeadline(LocalDate.now().plusDays(21));
            i1.setSampleListing(true);

            Internship i2 = new Internship();
            i2.setId("intern-102");
            i2.setTitle("Java Backend Engineering Intern");
            i2.setCompany("FinLedger Payments (Sample)");
            i2.setRoleCategory("Backend Engineering");
            i2.setDescription("Assist core payments team with Spring Boot services and MySQL optimization.");
            i2.setRequiredSkills(List.of("Java", "Spring Boot", "MySQL", "SQL", "REST APIs", "Docker"));
            i2.setPreferredSkills(List.of("Kafka", "Redis"));
            i2.setEducationRequirement(new EducationRequirement(List.of("B.Tech"), List.of("Computer Science and Engineering"), List.of(2026), 7.0, true, true, true));
            i2.setLocation("Bangalore");
            i2.setWorkMode(WorkMode.ONSITE);
            i2.setDurationMonths(6);
            i2.setStipendPerMonth(40000);
            i2.setDeadline(LocalDate.now().plusDays(15));
            i2.setSampleListing(true);

            internshipRepository.saveAll(List.of(i1, i2));
        }
    }
}
