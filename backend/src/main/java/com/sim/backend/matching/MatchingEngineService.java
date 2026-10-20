package com.sim.backend.matching;

import com.sim.backend.model.Internship;
import com.sim.backend.model.MatchResult;
import com.sim.backend.model.MatchResult.ComponentScores;
import com.sim.backend.model.MatchResult.CriterionCheck;
import com.sim.backend.model.MatchResult.RecommendedAction;
import com.sim.backend.model.StudentProfile;
import com.sim.backend.model.enums.CheckStatus;
import com.sim.backend.model.enums.EligibilityStatus;
import com.sim.backend.model.enums.WorkMode;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MatchingEngineService {

    public MatchResult evaluateMatch(StudentProfile student, Internship internship) {
        return evaluate(student, internship);
    }

    public MatchResult evaluate(StudentProfile student, Internship internship) {
        MatchResult result = new MatchResult();
        result.setStudentProfileId(student != null ? student.getId() : "student-1");
        result.setInternshipId(internship != null ? internship.getId() : "intern-101");
        result.setEvaluatedAt(LocalDateTime.now());

        if (student == null || internship == null) {
            result.setOverallScore(0.0);
            result.setEligibilityStatus(EligibilityStatus.ELIGIBILITY_NEEDS_VERIFICATION);
            result.setSummaryExplanation("Profile or Internship data missing");
            return result;
        }

        List<String> studentSkills = student.getSkills() == null
                ? new ArrayList<>()
                : student.getSkills().stream()
                        .filter(s -> s != null && s.getName() != null)
                        .map(s -> s.getName().trim())
                        .toList();

        List<String> studentSkillsLower = studentSkills.stream()
                .map(String::toLowerCase)
                .toList();

        List<String> requiredSkills = internship.getRequiredSkills() == null
                ? new ArrayList<>()
                : internship.getRequiredSkills();

        List<String> preferredSkills = internship.getPreferredSkills() == null
                ? new ArrayList<>()
                : internship.getPreferredSkills();

        List<String> matchedSkills = new ArrayList<>();
        List<String> missingMandatorySkills = new ArrayList<>();
        List<String> missingPreferredSkills = new ArrayList<>();

        for (String req : requiredSkills) {
            if (req != null && studentSkillsLower.contains(req.toLowerCase())) {
                matchedSkills.add(req);
            } else if (req != null) {
                missingMandatorySkills.add(req);
            }
        }

        for (String pref : preferredSkills) {
            if (pref != null && studentSkillsLower.contains(pref.toLowerCase())) {
                if (!matchedSkills.contains(pref)) {
                    matchedSkills.add(pref);
                }
            } else if (pref != null) {
                missingPreferredSkills.add(pref);
            }
        }

        result.setMatchedSkills(matchedSkills);
        result.setMissingMandatorySkills(missingMandatorySkills);
        result.setMissingPreferredSkills(missingPreferredSkills);

        double techScore = calculateTechnicalScore(studentSkillsLower, requiredSkills, preferredSkills);
        double eduScore = calculateEducationScore(student, internship);
        double projScore = calculateProjectScore(student, requiredSkills);
        double prefScore = calculatePreferenceScore(student, internship);
        double certScore = calculateCertificationScore(student);

        ComponentScores cs = new ComponentScores();
        cs.setTechnicalSkillsScore(round2(techScore));
        cs.setEducationRelevanceScore(round2(eduScore));
        cs.setProjectAndExperienceScore(round2(projScore));
        cs.setLocationAndPreferenceScore(round2(prefScore));
        cs.setAdditionalQualificationsScore(round2(certScore));
        result.setComponentScores(cs);

        double overall = (techScore * 0.35) + (eduScore * 0.20) + (projScore * 0.20) + (prefScore * 0.15) + (certScore * 0.10);
        result.setOverallScore(round2(overall));

        List<CriterionCheck> checks = evaluateEligibilityChecks(student, internship);
        result.setEligibilityChecks(checks);

        boolean anyFailedMandatory = checks.stream()
                .anyMatch(c -> c.isMandatory() && c.getStatus() == CheckStatus.FAILED);

        result.setEligibilityStatus(anyFailedMandatory
                ? EligibilityStatus.MANDATORY_REQUIREMENT_NOT_MET
                : EligibilityStatus.MEETS_SPECIFIED_MANDATORY_REQUIREMENTS);

        result.setUnknownOrUnverifiedRequirements(new ArrayList<>());

        List<RecommendedAction> actions = new ArrayList<>();
        for (String missing : missingMandatorySkills) {
            actions.add(new RecommendedAction(
                    "HIGH", missing, "Required by recruiter",
                    "Add " + missing + " to your active projects.",
                    "Integrate " + missing + " in your GitHub portfolio."
            ));
        }
        result.setRecommendedActions(actions);

        result.setSummaryExplanation(String.format(
                "Overall score: %.1f%% for %s at %s. Matched: %s.",
                result.getOverallScore(),
                internship.getTitle() != null ? internship.getTitle() : "Role",
                internship.getCompany() != null ? internship.getCompany() : "Company",
                matchedSkills.isEmpty() ? "None" : String.join(", ", matchedSkills)
        ));

        return result;
    }

    private double calculateTechnicalScore(List<String> studentSkillsLower, List<String> required, List<String> preferred) {
        if (required.isEmpty()) return 80.0;
        long matchedRequired = required.stream().filter(r -> r != null && studentSkillsLower.contains(r.toLowerCase())).count();
        double ratio = (double) matchedRequired / required.size();
        return Math.min(ratio * 100.0, 100.0);
    }

    private double calculateEducationScore(StudentProfile student, Internship internship) {
        if (student.getEducation() == null || student.getEducation().isEmpty()) return 70.0;
        StudentProfile.EducationEntry edu = student.getEducation().get(0);
        double score = 60.0;
        if (edu.getCgpa() != null && edu.getCgpa() >= 7.0) score += 30.0;
        else score += 15.0;
        return Math.min(score, 100.0);
    }

    private double calculateProjectScore(StudentProfile student, List<String> requiredSkills) {
        if (student.getProjects() == null || student.getProjects().isEmpty()) return 60.0;
        int matches = 0;
        for (StudentProfile.ProjectItem project : student.getProjects()) {
            if (project.getTechStack() == null) continue;
            for (String tech : project.getTechStack()) {
                if (tech != null && requiredSkills.stream().anyMatch(r -> r.equalsIgnoreCase(tech))) {
                    matches++;
                }
            }
        }
        return Math.min(matches * 25.0 + 50.0, 100.0);
    }

    private double calculatePreferenceScore(StudentProfile student, Internship internship) {
        double score = 50.0;
        if (student.getCurrentLocation() != null && internship.getLocation() != null &&
            student.getCurrentLocation().equalsIgnoreCase(internship.getLocation())) {
            score += 50.0;
        }
        return Math.min(score, 100.0);
    }

    private double calculateCertificationScore(StudentProfile student) {
        if (student.getCertifications() != null && !student.getCertifications().isEmpty()) {
            return Math.min(student.getCertifications().size() * 30.0 + 40.0, 100.0);
        }
        return 70.0;
    }

    private List<CriterionCheck> evaluateEligibilityChecks(StudentProfile student, Internship internship) {
        List<CriterionCheck> checks = new ArrayList<>();
        if (student.getEducation() == null || student.getEducation().isEmpty() || internship.getEducationRequirement() == null) {
            return checks;
        }
        StudentProfile.EducationEntry edu = student.getEducation().get(0);
        Internship.EducationRequirement req = internship.getEducationRequirement();

        if (req.getAllowedGraduationYears() != null && !req.getAllowedGraduationYears().isEmpty()) {
            boolean passed = edu.getGraduationYear() != null && req.getAllowedGraduationYears().contains(edu.getGraduationYear());
            CriterionCheck check = new CriterionCheck();
            check.setCategory("EDUCATION");
            check.setCriterionName("Graduation Year");
            check.setMandatory(req.isGraduationYearMandatory());
            check.setStatus(passed ? CheckStatus.PASSED : CheckStatus.FAILED);
            check.setExpectedRequirement(req.getAllowedGraduationYears().toString());
            check.setProfileEvidence(String.valueOf(edu.getGraduationYear()));
            check.setExplanation(passed ? "Batch matches requirement" : "Graduation year outside allowed range");
            checks.add(check);
        }

        if (req.getMinimumCgpa() != null) {
            boolean cgpaPassed = edu.getCgpa() != null && edu.getCgpa() >= req.getMinimumCgpa();
            CriterionCheck check = new CriterionCheck();
            check.setCategory("EDUCATION");
            check.setCriterionName("Minimum CGPA");
            check.setMandatory(req.isCgpaMandatory());
            check.setStatus(cgpaPassed ? CheckStatus.PASSED : CheckStatus.FAILED);
            check.setExpectedRequirement(">= " + req.getMinimumCgpa());
            check.setProfileEvidence(String.valueOf(edu.getCgpa()));
            check.setExplanation(cgpaPassed ? "CGPA meets cutoff" : "CGPA below minimum requirement");
            checks.add(check);
        }

        return checks;
    }

    private double round2(double val) {
        return Math.round(val * 100.0) / 100.0;
    }
}