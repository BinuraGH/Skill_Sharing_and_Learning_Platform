package com.paf.backend.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.paf.backend.document.SkillSharing;

public interface SkillShareRepository extends MongoRepository<SkillSharing, String> {
    // You can add custom queries here if needed
    List<SkillSharing> findByUserId(String userId);
}
