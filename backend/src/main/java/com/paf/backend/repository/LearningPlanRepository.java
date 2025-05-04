package com.paf.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.paf.backend.document.LearningPlan;
import java.util.List;




public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {
    List<LearningPlan> findByUserId(String userId);

}
