package com.paf.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.paf.backend.document.Reaction;

public interface ReactionRepository extends MongoRepository<Reaction, String> {
    List<Reaction> findByPostIdAndPostType(String postId, String postType);
    long countByPostIdAndPostType(String postId, String postType);
    long countByPostIdAndPostTypeAndType(String postId, String postType, String type);
    boolean existsByPostIdAndUserIdAndPostType(String postId, String userId, String postType);
    void deleteByPostIdAndUserIdAndPostType(String postId, String userId, String postType);
}
