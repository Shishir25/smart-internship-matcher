package com.sim.backend.model;

import com.sim.backend.model.enums.ApplicationStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "applications")
public class ApplicationTracking {
    @Id
    private String id;
    private String studentProfileId;
    private String internshipId;
    private ApplicationStatus status = ApplicationStatus.APPLIED;
    private LocalDate appliedDate = LocalDate.now();
    private Double matchScoreSnapshot;
    private String notes;
    private String nextAction;
    private LocalDateTime updatedAt = LocalDateTime.now();

    public ApplicationTracking() {}
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }
    public String getInternshipId() { return internshipId; }
    public void setInternshipId(String internshipId) { this.internshipId = internshipId; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDate getAppliedDate() { return appliedDate; }
    public void setAppliedDate(LocalDate appliedDate) { this.appliedDate = appliedDate; }
    public Double getMatchScoreSnapshot() { return matchScoreSnapshot; }
    public void setMatchScoreSnapshot(Double matchScoreSnapshot) { this.matchScoreSnapshot = matchScoreSnapshot; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getNextAction() { return nextAction; }
    public void setNextAction(String nextAction) { this.nextAction = nextAction; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
