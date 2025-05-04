package com.paf.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.paf.backend.document.LearningPlan;
import java.util.List;


@Repository
public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {
    List<LearningPlan> findByUserId(String userId);

    //Added: Filter by free or paid
    List<LearningPlan> findByIsPaid(boolean isPaid);

    List<LearningPlan> findByUserIdIn(List<String> userIds);

}
