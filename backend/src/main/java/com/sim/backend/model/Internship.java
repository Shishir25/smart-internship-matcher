package com.sim.backend.model;

import com.sim.backend.model.enums.WorkMode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "internships")
public class Internship {
    @Id
    private String id;
    private String title;
    private String company;
    private String roleCategory;
    private String description;
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> preferredSkills = new ArrayList<>();
    private EducationRequirement educationRequirement = new EducationRequirement();
    private String location;
    private WorkMode workMode = WorkMode.ONSITE;
    private Integer durationMonths;
    private Integer stipendPerMonth;
    private LocalDate deadline;
    private String applicationUrl;
    private String source;
    private boolean sampleListing = true;

    public Internship() {}

    public static class EducationRequirement {
        private List<String> allowedDegrees = new ArrayList<>();
        private List<String> allowedBranches = new ArrayList<>();
        private List<Integer> allowedGraduationYears = new ArrayList<>();
        private Double minimumCgpa;
        private boolean degreeMandatory = true;
        private boolean graduationYearMandatory = true;
        private boolean cgpaMandatory = false;

        public EducationRequirement() {}
        public EducationRequirement(List<String> allowedDegrees, List<String> allowedBranches,
                                    List<Integer> allowedGraduationYears, Double minimumCgpa,
                                    boolean degreeMandatory, boolean graduationYearMandatory, boolean cgpaMandatory) {
            this.allowedDegrees = allowedDegrees; this.allowedBranches = allowedBranches;
            this.allowedGraduationYears = allowedGraduationYears; this.minimumCgpa = minimumCgpa;
            this.degreeMandatory = degreeMandatory; this.graduationYearMandatory = graduationYearMandatory;
            this.cgpaMandatory = cgpaMandatory;
        }
        public List<String> getAllowedDegrees() { return allowedDegrees; }
        public void setAllowedDegrees(List<String> allowedDegrees) { this.allowedDegrees = allowedDegrees; }
        public List<String> getAllowedBranches() { return allowedBranches; }
        public void setAllowedBranches(List<String> allowedBranches) { this.allowedBranches = allowedBranches; }
        public List<Integer> getAllowedGraduationYears() { return allowedGraduationYears; }
        public void setAllowedGraduationYears(List<Integer> allowedGraduationYears) { this.allowedGraduationYears = allowedGraduationYears; }
        public Double getMinimumCgpa() { return minimumCgpa; }
        public void setMinimumCgpa(Double minimumCgpa) { this.minimumCgpa = minimumCgpa; }
        public boolean isDegreeMandatory() { return degreeMandatory; }
        public void setDegreeMandatory(boolean degreeMandatory) { this.degreeMandatory = degreeMandatory; }
        public boolean isGraduationYearMandatory() { return graduationYearMandatory; }
        public void setGraduationYearMandatory(boolean graduationYearMandatory) { this.graduationYearMandatory = graduationYearMandatory; }
        public boolean isCgpaMandatory() { return cgpaMandatory; }
        public void setCgpaMandatory(boolean cgpaMandatory) { this.cgpaMandatory = cgpaMandatory; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRoleCategory() { return roleCategory; }
    public void setRoleCategory(String roleCategory) { this.roleCategory = roleCategory; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
    public List<String> getPreferredSkills() { return preferredSkills; }
    public void setPreferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; }
    public EducationRequirement getEducationRequirement() { return educationRequirement; }
    public void setEducationRequirement(EducationRequirement educationRequirement) { this.educationRequirement = educationRequirement; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public WorkMode getWorkMode() { return workMode; }
    public void setWorkMode(WorkMode workMode) { this.workMode = workMode; }
    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }
    public Integer getStipendPerMonth() { return stipendPerMonth; }
    public void setStipendPerMonth(Integer stipendPerMonth) { this.stipendPerMonth = stipendPerMonth; }
    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
    public String getApplicationUrl() { return applicationUrl; }
    public void setApplicationUrl(String applicationUrl) { this.applicationUrl = applicationUrl; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public boolean isSampleListing() { return sampleListing; }
    public void setSampleListing(boolean sampleListing) { this.sampleListing = sampleListing; }
}
