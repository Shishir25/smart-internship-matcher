package com.sim.backend;

import com.sim.backend.model.Internship;
import com.sim.backend.model.MatchResult;
import com.sim.backend.model.enums.EligibilityStatus;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FoundationModelTest {
    @Test
    void unspecifiedInternshipRequirementsMustNotDefaultToMandatoryCutoffs() {
        Internship internship = new Internship();
        internship.setTitle("Frontend Intern");
        assertNull(internship.getEducationRequirement().getMinimumCgpa());
        assertFalse(internship.getEducationRequirement().isCgpaMandatory());
        assertTrue(internship.isSampleListing());
    }

    @Test
    void matchResultMustStoreEligibilitySeparatelyFromWeightedScore() {
        MatchResult result = new MatchResult();
        result.setOverallScore(84.5);
        result.setEligibilityStatus(EligibilityStatus.MANDATORY_REQUIREMENT_NOT_MET);
        assertEquals(84.5, result.getOverallScore());
        assertEquals(EligibilityStatus.MANDATORY_REQUIREMENT_NOT_MET, result.getEligibilityStatus());
    }
}
