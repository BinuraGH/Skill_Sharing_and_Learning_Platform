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
        if (reactionRepository.existsByPostIdAndUserIdAndPostType(reaction.getPostId(), reaction.getUserId(), reaction.getPostType())) {
            reactionRepository.deleteByPostIdAndUserIdAndPostType(reaction.getPostId(), reaction.getUserId(), reaction.getPostType());
        }
        return reactionRepository.save(reaction);
    }

    public void removeReaction(String postId, String userId, String postType) {
        reactionRepository.deleteByPostIdAndUserIdAndPostType(postId, userId, postType);
    }

    public Map<String, Long> getReactionCounts(String postId, String postType) {
        List<Reaction> reactions = reactionRepository.findByPostIdAndPostType(postId, postType);
        return reactions.stream()
                .collect(Collectors.groupingBy(Reaction::getType, Collectors.counting()));
    }

    public long getTotalCount(String postId, String postType) {
        return reactionRepository.countByPostIdAndPostType(postId, postType);
    }
}
