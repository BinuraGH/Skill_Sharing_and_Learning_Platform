package com.paf.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

import com.paf.backend.document.Reaction;

public interface ReactionRepository extends MongoRepository<Reaction, String> {
    List<Reaction> findByPostId(String postId);
    long countByPostId(String postId);
    long countByPostIdAndType(String postId, String type);
    boolean existsByPostIdAndUserId(String postId, String userId);
    void deleteByPostIdAndUserId(String postId, String userId);
    Optional<Reaction> findByPostId(String postId, String userId);

}
