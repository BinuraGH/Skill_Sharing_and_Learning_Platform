package com.paf.backend.controller;

import com.paf.backend.document.LearningPlan;
import com.paf.backend.dto.LearningPlanDto;
import com.paf.backend.dto.LearningPlanWithProgressDto;
import com.paf.backend.service.LearningPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class LearningPlanController {

    private final LearningPlanService service;

    @PostMapping
    public LearningPlan createPlan(@RequestBody LearningPlanDto learndto) {
        return service.createPlan(learndto);
    }

    @GetMapping
    public List<LearningPlan> getAllPlans() {
        return service.getAllPlans();
    }

    @GetMapping("/user/{userId}")
    public List<LearningPlan> getPlansByUser(@PathVariable String userId) {
        return service.getPlansByUser(userId);
    }

    @GetMapping("/{id}")
    public LearningPlan getPlan(@PathVariable String id) {
        return service.getPlan(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan not found"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlan(@PathVariable String id, @RequestBody LearningPlanDto dto) {
        return service.updatePlan(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable String id) {
        service.deletePlan(id);
    }

    @PatchMapping("/{planId}/topics/{index}/complete")
    public LearningPlan markTopicAsComplete(@PathVariable String planId,
                                            @PathVariable int index) {
        return service.markTopicCompleted(planId, index);
    }

    @GetMapping("/{id}/progress")
    public LearningPlanWithProgressDto getPlanWithProgress(@PathVariable String id) {
        return service.getPlanWithProgress(id);
    }

    // 🔴 Removed filter by payment status
    // @GetMapping("/filter")
    // public List<LearningPlan> filterPlans(@RequestParam(required = false) Boolean isPaid) {
    //     if (isPaid == null) {
    //         return service.getAllPlans();
    //     }
    //     return service.getPlansByPaymentStatus(isPaid);
    // }

    @GetMapping("/followed/{userId}")
    public List<LearningPlan> getPlansByFollowedUsers(@PathVariable String userId) {
        return service.getPlansByFollowedUsers(userId);
    }
}
