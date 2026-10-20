package com.sim.backend.model;

import com.sim.backend.model.enums.CheckStatus;
import com.sim.backend.model.enums.EligibilityStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "match_results")
public class MatchResult {
    @Id
    private String id;
    private String studentProfileId;
    private String internshipId;
    private double overallScore;
    private ComponentScores componentScores = new ComponentScores();
    private EligibilityStatus eligibilityStatus;
    private List<String> matchedSkills = new ArrayList<>();
    private List<String> missingMandatorySkills = new ArrayList<>();
    private List<String> missingPreferredSkills = new ArrayList<>();
    private List<CriterionCheck> eligibilityChecks = new ArrayList<>();
    private List<String> unknownOrUnverifiedRequirements = new ArrayList<>();
    private List<RecommendedAction> recommendedActions = new ArrayList<>();
    private String summaryExplanation;
    private LocalDateTime evaluatedAt = LocalDateTime.now();

    public MatchResult() {}

    public static class ComponentScores {
        private double technicalSkillsScore;
        private double educationRelevanceScore;
        private double projectAndExperienceScore;
        private double locationAndPreferenceScore;
        private double additionalQualificationsScore;

        public ComponentScores() {}
        public double getTechnicalSkillsScore() { return technicalSkillsScore; }
        public void setTechnicalSkillsScore(double technicalSkillsScore) { this.technicalSkillsScore = technicalSkillsScore; }
        public double getEducationRelevanceScore() { return educationRelevanceScore; }
        public void setEducationRelevanceScore(double educationRelevanceScore) { this.educationRelevanceScore = educationRelevanceScore; }
        public double getProjectAndExperienceScore() { return projectAndExperienceScore; }
        public void setProjectAndExperienceScore(double projectAndExperienceScore) { this.projectAndExperienceScore = projectAndExperienceScore; }
        public double getLocationAndPreferenceScore() { return locationAndPreferenceScore; }
        public void setLocationAndPreferenceScore(double locationAndPreferenceScore) { this.locationAndPreferenceScore = locationAndPreferenceScore; }
        public double getAdditionalQualificationsScore() { return additionalQualificationsScore; }
        public void setAdditionalQualificationsScore(double additionalQualificationsScore) { this.additionalQualificationsScore = additionalQualificationsScore; }
    }

    public static class CriterionCheck {
        private String category;
        private String criterionName;
        private boolean mandatory;
        private CheckStatus status;
        private String expectedRequirement;
        private String profileEvidence;
        private String explanation;

        public CriterionCheck() {}
        public CriterionCheck(String category, String criterionName, boolean mandatory,
                              CheckStatus status, String expectedRequirement, String profileEvidence, String explanation) {
            this.category = category; this.criterionName = criterionName; this.mandatory = mandatory;
            this.status = status; this.expectedRequirement = expectedRequirement;
            this.profileEvidence = profileEvidence; this.explanation = explanation;
        }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getCriterionName() { return criterionName; }
        public void setCriterionName(String criterionName) { this.criterionName = criterionName; }
        public boolean isMandatory() { return mandatory; }
        public void setMandatory(boolean mandatory) { this.mandatory = mandatory; }
        public CheckStatus getStatus() { return status; }
        public void setStatus(CheckStatus status) { this.status = status; }
        public String getExpectedRequirement() { return expectedRequirement; }
        public void setExpectedRequirement(String expectedRequirement) { this.expectedRequirement = expectedRequirement; }
        public String getProfileEvidence() { return profileEvidence; }
        public void setProfileEvidence(String profileEvidence) { this.profileEvidence = profileEvidence; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public static class RecommendedAction {
        private String priority;
        private String skillOrArea;
        private String whyItMatters;
        private String suggestedAction;
        private String projectIdea;

        public RecommendedAction() {}
        public RecommendedAction(String priority, String skillOrArea, String whyItMatters, String suggestedAction, String projectIdea) {
            this.priority = priority; this.skillOrArea = skillOrArea; this.whyItMatters = whyItMatters;
            this.suggestedAction = suggestedAction; this.projectIdea = projectIdea;
        }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getSkillOrArea() { return skillOrArea; }
        public void setSkillOrArea(String skillOrArea) { this.skillOrArea = skillOrArea; }
        public String getWhyItMatters() { return whyItMatters; }
        public void setWhyItMatters(String whyItMatters) { this.whyItMatters = whyItMatters; }
        public String getSuggestedAction() { return suggestedAction; }
        public void setSuggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; }
        public String getProjectIdea() { return projectIdea; }
        public void setProjectIdea(String projectIdea) { this.projectIdea = projectIdea; }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentProfileId() { return studentProfileId; }
    public void setStudentProfileId(String studentProfileId) { this.studentProfileId = studentProfileId; }
    public String getInternshipId() { return internshipId; }
    public void setInternshipId(String internshipId) { this.internshipId = internshipId; }
    public double getOverallScore() { return overallScore; }
    public void setOverallScore(double overallScore) { this.overallScore = overallScore; }
    public ComponentScores getComponentScores() { return componentScores; }
    public void setComponentScores(ComponentScores componentScores) { this.componentScores = componentScores; }
    public EligibilityStatus getEligibilityStatus() { return eligibilityStatus; }
    public void setEligibilityStatus(EligibilityStatus eligibilityStatus) { this.eligibilityStatus = eligibilityStatus; }
    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }
    public List<String> getMissingMandatorySkills() { return missingMandatorySkills; }
    public void setMissingMandatorySkills(List<String> missingMandatorySkills) { this.missingMandatorySkills = missingMandatorySkills; }
    public List<String> getMissingPreferredSkills() { return missingPreferredSkills; }
    public void setMissingPreferredSkills(List<String> missingPreferredSkills) { this.missingPreferredSkills = missingPreferredSkills; }
    public List<CriterionCheck> getEligibilityChecks() { return eligibilityChecks; }
    public void setEligibilityChecks(List<CriterionCheck> eligibilityChecks) { this.eligibilityChecks = eligibilityChecks; }
    public List<String> getUnknownOrUnverifiedRequirements() { return unknownOrUnverifiedRequirements; }
    public void setUnknownOrUnverifiedRequirements(List<String> unknownOrUnverifiedRequirements) { this.unknownOrUnverifiedRequirements = unknownOrUnverifiedRequirements; }
    public List<RecommendedAction> getRecommendedActions() { return recommendedActions; }
    public void setRecommendedActions(List<RecommendedAction> recommendedActions) { this.recommendedActions = recommendedActions; }
    public String getSummaryExplanation() { return summaryExplanation; }
    public void setSummaryExplanation(String summaryExplanation) { this.summaryExplanation = summaryExplanation; }
    public LocalDateTime getEvaluatedAt() { return evaluatedAt; }
    public void setEvaluatedAt(LocalDateTime evaluatedAt) { this.evaluatedAt = evaluatedAt; }
}
