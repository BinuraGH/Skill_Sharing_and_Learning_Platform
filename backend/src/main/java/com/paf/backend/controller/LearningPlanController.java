package com.paf.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.backend.document.LearningPlan;
import com.paf.backend.dto.LearningPlanDto;
import com.paf.backend.dto.LearningPlanWithProgressDto;
import com.paf.backend.service.LearningPlanService;


@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class LearningPlanController {

    @Autowired
    private LearningPlanService service;

    @PostMapping
    public LearningPlan createPlan(@RequestBody LearningPlanDto dto) {
        return service.createPlan(dto);
    }

    @GetMapping("/user/{userId}")
    public List<LearningPlan> getPlansByUser(@PathVariable String userId) {
        return service.getPlansByUser(userId);
    }

    @GetMapping("/{id}")
    public LearningPlan getPlan(@PathVariable String id) {
        return service.getPlan(id).orElse(null);
    }

    @PutMapping("/{id}")
    public LearningPlan updatePlan(@PathVariable String id, @RequestBody LearningPlanDto dto) {
        return service.updatePlan(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePlan(@PathVariable String id) {
        service.deletePlan(id);
    }
    @PatchMapping("/{planId}/topics/{index}/complete")
    public LearningPlan markTopicAsComplete(@PathVariable String planId, @PathVariable int index) {
        return service.markTopicCompleted(planId, index);
    }

    @GetMapping("/{id}/progress")
    public LearningPlanWithProgressDto getPlanWithProgress(@PathVariable String id) {
        return service.getPlanWithProgress(id);
    }

}
