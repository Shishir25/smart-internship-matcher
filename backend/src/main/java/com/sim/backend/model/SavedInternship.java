package com.sim.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "saved_internships")
public class SavedInternship {
    @Id
    private String id;
    private String studentProfileId;
    private String internshipId;
    private String notes;
    private LocalDateTime savedAt = LocalDateTime.now();

    public SavedInternship() {}
    public SavedInternship(String studentProfileId, String internshipId, String notes) {
        this.studentProfileId = studentProfileId;
        this.internshipId = internshipId;
        this.notes = notes;
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }
    public String getInternshipId() { return internshipId; }
    public void setInternshipId(String internshipId) { this.internshipId = internshipId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}
