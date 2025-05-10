package com.paf.backend.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.paf.backend.document.Enrollment;
import com.paf.backend.document.LearningPlan;
import com.paf.backend.service.EnrollmentService;


@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService service;

    @PostMapping
    public Enrollment enroll(@RequestParam String userId, @RequestParam String planId) {
        return service.enroll(userId, planId);
    }

    @GetMapping("/{userId}")
    public List<Enrollment> getEnrollments(@PathVariable String userId) {
        return service.getEnrollmentsByUser(userId);
    }
    //Get full learning plans enrolled by a user
    @GetMapping("/user/{userId}/plans")
    public List<LearningPlan> getEnrolledPlans(@PathVariable String userId) {
        return service.getEnrolledPlans(userId);
    }
}
