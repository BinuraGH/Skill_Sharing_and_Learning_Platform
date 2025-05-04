package com.paf.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.paf.backend.document.ProgressUpdate;
import java.util.List;

public interface ProgressUpdateRepository extends MongoRepository<ProgressUpdate, String> {
    List<ProgressUpdate> findByUserId(String userId);
} 
