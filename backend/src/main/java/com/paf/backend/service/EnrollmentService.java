package com.paf.backend.service;

import com.paf.backend.document.Enrollment;
import com.paf.backend.document.LearningPlan;
import com.paf.backend.repository.EnrollmentRepository;
import com.paf.backend.repository.LearningPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository repository;
    private final LearningPlanRepository learningPlanRepository;

    // Enroll user if not already enrolled
    public Enrollment enroll(String userId, String planId) {
        if (repository.existsByUserIdAndPlanId(userId, planId)) {
            throw new IllegalArgumentException("User already enrolled in this plan");
        }

        Enrollment enrollment = new Enrollment(userId, planId);
        return repository.save(enrollment);
    }
    //Return all enrollment records by user
    public List<Enrollment> getEnrollmentsByUser(String userId) {
        return repository.findByUserId(userId);
    }
    //Return full learning plans a user is enrolled in
    public List<LearningPlan> getEnrolledPlans(String userId) {
        List<Enrollment> enrollments = repository.findByUserId(userId);
        List<String> planIds = enrollments.stream()
                .map(Enrollment::getPlanId)
                .toList();
        return learningPlanRepository.findAllById(planIds);
    }
}
