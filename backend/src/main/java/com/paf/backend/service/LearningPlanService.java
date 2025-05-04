package com.paf.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.paf.backend.document.LearningPlan;
import com.paf.backend.document.Topic;
import com.paf.backend.dto.LearningPlanDto;
import com.paf.backend.dto.LearningPlanWithProgressDto;
import com.paf.backend.repository.LearningPlanRepository;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository repository;

    // ✅ Create new learning plan
    public LearningPlan createPlan(LearningPlanDto dto) {
        LearningPlan plan = new LearningPlan(
            dto.getUserId(),
            dto.getTitle(),
            dto.getDescription(),
            "In Progress",  // default status
            dto.isPaid(),
            dto.getPrice(),
            dto.getThumbnailUrl(),
            dto.getCourseDescription(),
            dto.getTopics()
        );

        LearningPlan saved = repository.save(plan);
        System.out.println("📥 Inserted Learning Plan with ID: " + saved.getId());
        return saved;
    }

    // ✅ Get all plans for a user
    public List<LearningPlan> getPlansByUser(String userId) {
        return repository.findByUserId(userId);
    }

    // ✅ Get a single plan by ID
    public Optional<LearningPlan> getPlan(String id) {
        return repository.findById(id);
    }

    // ✅ Update a plan by ID
    public LearningPlan updatePlan(String id, LearningPlanDto dto) {
        Optional<LearningPlan> optionalPlan = repository.findById(id);
        if (optionalPlan.isPresent()) {
            LearningPlan plan = optionalPlan.get();
            plan.setTitle(dto.getTitle());
            plan.setDescription(dto.getDescription());
            plan.setPaid(dto.isPaid());
            plan.setPrice(dto.getPrice());
            plan.setThumbnailUrl(dto.getThumbnailUrl());
            plan.setCourseDescription(dto.getCourseDescription());
            plan.setTopics(dto.getTopics());
            return repository.save(plan);
        }
        return null;
    }

    // ✅ Delete a plan
    public void deletePlan(String id) {
        repository.deleteById(id);
    }

    // ✅ Mark a specific topic as completed
    public LearningPlan markTopicCompleted(String planId, int index) {
        Optional<LearningPlan> optional = repository.findById(planId);
        if (optional.isPresent()) {
            LearningPlan plan = optional.get();

            if (index < 0 || index >= plan.getTopics().size()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid topic index");
            }

            // Mark the topic as completed
            plan.getTopics().get(index).setCompleted(true);

            // Mark plan as completed if all topics are done
            boolean allDone = plan.getTopics().stream().allMatch(Topic::isCompleted);
            if (allDone) {
                plan.setStatus("Completed");
            }

            return repository.save(plan);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan not found");
        }
    }

    // ✅ Get plan along with progress % data
    public LearningPlanWithProgressDto getPlanWithProgress(String id) {
        Optional<LearningPlan> optionalPlan = repository.findById(id);

        if (optionalPlan.isPresent()) {
            LearningPlan plan = optionalPlan.get();
            List<Topic> topics = plan.getTopics();
            long completedCount = topics.stream().filter(Topic::isCompleted).count();
            int progress = (int) ((double) completedCount / topics.size() * 100);

            return new LearningPlanWithProgressDto(
                plan.getId(),
                plan.getUserId(),
                plan.getTitle(),
                plan.getDescription(),
                plan.getStatus(),
                plan.isPaid(),
                plan.getPrice(),
                plan.getThumbnailUrl(),
                plan.getCourseDescription(),
                plan.getTopics(),
                progress
            );
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan not found");
    }
}
