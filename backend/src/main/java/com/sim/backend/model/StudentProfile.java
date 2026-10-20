package com.sim.backend.model;

import com.sim.backend.model.enums.WorkMode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "student_profiles")
public class StudentProfile {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private String fullName;
    private String email;
    private String headline;
    private String currentLocation;
    private String githubUrl;
    private List<EducationEntry> education = new ArrayList<>();
    private List<SkillItem> skills = new ArrayList<>();
    private List<ProjectItem> projects = new ArrayList<>();
    private List<String> certifications = new ArrayList<>();
    private List<String> preferredRoles = new ArrayList<>();
    private List<String> preferredLocations = new ArrayList<>();
    private WorkMode workModePreference = WorkMode.ANY;
    private Integer availableDurationMonths;
    private LocalDateTime updatedAt = LocalDateTime.now();

    public StudentProfile() {}

    public static class EducationEntry {
        private String degree;
        private String branch;
        private String institution;
        private Integer graduationYear;
        private Double cgpa;
        public EducationEntry() {}
        public EducationEntry(String degree, String branch, String institution, Integer graduationYear, Double cgpa) {
            this.degree = degree; this.branch = branch; this.institution = institution;
            this.graduationYear = graduationYear; this.cgpa = cgpa;
        }
        public String getDegree() { return degree; }
        public void setDegree(String degree) { this.degree = degree; }
        public String getBranch() { return branch; }
        public void setBranch(String branch) { this.branch = branch; }
        public String getInstitution() { return institution; }
        public void setInstitution(String institution) { this.institution = institution; }
        public Integer getGraduationYear() { return graduationYear; }
        public void setGraduationYear(Integer graduationYear) { this.graduationYear = graduationYear; }
        public Double getCgpa() { return cgpa; }
        public void setCgpa(Double cgpa) { this.cgpa = cgpa; }
    }

    public static class SkillItem {
        private String name;
        private String category;
        private String proficiency;
        public SkillItem() {}
        public SkillItem(String name, String category, String proficiency) {
            this.name = name; this.category = category; this.proficiency = proficiency;
        }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getProficiency() { return proficiency; }
        public void setProficiency(String proficiency) { this.proficiency = proficiency; }
    }

    public static class ProjectItem {
        private String title;
        private String description;
        private List<String> techStack = new ArrayList<>();
        private String domain;
        private String githubUrl;
        public ProjectItem() {}
        public ProjectItem(String title, String description, List<String> techStack, String domain, String githubUrl) {
            this.title = title; this.description = description; this.techStack = techStack;
            this.domain = domain; this.githubUrl = githubUrl;
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<String> getTechStack() { return techStack; }
        public void setTechStack(List<String> techStack) { this.techStack = techStack; }
        public String getDomain() { return domain; }
        public void setDomain(String domain) { this.domain = domain; }
        public String getGithubUrl() { return githubUrl; }
        public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
    public String getCurrentLocation() { return currentLocation; }
    public void setCurrentLocation(String currentLocation) { this.currentLocation = currentLocation; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public List<EducationEntry> getEducation() { return education; }
    public void setEducation(List<EducationEntry> education) { this.education = education; }
    public List<SkillItem> getSkills() { return skills; }
    public void setSkills(List<SkillItem> skills) { this.skills = skills; }
    public List<ProjectItem> getProjects() { return projects; }
    public void setProjects(List<ProjectItem> projects) { this.projects = projects; }
    public List<String> getCertifications() { return certifications; }
    public void setCertifications(List<String> certifications) { this.certifications = certifications; }
    public List<String> getPreferredRoles() { return preferredRoles; }
    public void setPreferredRoles(List<String> preferredRoles) { this.preferredRoles = preferredRoles; }
    public List<String> getPreferredLocations() { return preferredLocations; }
    public void setPreferredLocations(List<String> preferredLocations) { this.preferredLocations = preferredLocations; }
    public WorkMode getWorkModePreference() { return workModePreference; }
    public void setWorkModePreference(WorkMode workModePreference) { this.workModePreference = workModePreference; }
    public Integer getAvailableDurationMonths() { return availableDurationMonths; }
    public void setAvailableDurationMonths(Integer availableDurationMonths) { this.availableDurationMonths = availableDurationMonths; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
