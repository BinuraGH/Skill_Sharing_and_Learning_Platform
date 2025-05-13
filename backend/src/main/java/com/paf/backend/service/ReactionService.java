package com.paf.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.paf.backend.document.Reaction;
import com.paf.backend.repository.ReactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;

    public Reaction addReaction(Reaction reaction) {
        // Optional: prevent duplicate by same user on same post
        if (reactionRepository.existsByPostIdAndUserId(reaction.getPostId(), reaction.getUserId())) {
            reactionRepository.deleteByPostIdAndUserId(reaction.getPostId(), reaction.getUserId());
        }
        return reactionRepository.save(reaction);
    }

    public void removeReaction(String postId, String userId) {
        reactionRepository.deleteByPostIdAndUserId(postId, userId);
    }

    public Map<String, Long> getReactionCounts(String postId) {
        List<Reaction> reactions = reactionRepository.findByPostId(postId);
        return reactions.stream()
                .collect(Collectors.groupingBy(Reaction::getType, Collectors.counting()));
    }

    public long getTotalCount(String postId) {
        return reactionRepository.countByPostId(postId);
    }

    public Reaction getUserReaction(String postId, String userId) {
        return reactionRepository.findByPostId(postId, userId).orElse(null);
    }

}
