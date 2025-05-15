package com.paf.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.paf.backend.document.Reaction;
import com.paf.backend.document.SkillSharing;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.dto.ReactionDTO;
import com.paf.backend.repository.ReactionRepository;
import com.paf.backend.repository.SkillShareRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;

    @Autowired
    private SkillShareRepository skillShareRepository;

    @Autowired
    private NotificationService notificationService;

    public Reaction addReaction(ReactionDTO request) {
        if (reactionRepository.existsByPostIdAndUserId(request.getPostId(), request.getUserId())) {
            reactionRepository.deleteByPostIdAndUserId(request.getPostId(), request.getUserId());
        }

        // Save new reaction
        Reaction reaction = Reaction.builder()
                .postId(request.getPostId())
                .userId(request.getUserId())
                .userName(request.getUserName())
                .type(request.getType())
                .build();

        Reaction saved = reactionRepository.save(reaction);

        // 🔔 Send notification to post owner
        Optional<SkillSharing> skillPostOpt = skillShareRepository.findById(reaction.getPostId());
        if (skillPostOpt.isPresent()) {
            SkillSharing post = skillPostOpt.get();

            // Avoid notifying the user about their own reaction
            if (!post.getUserId().equals(reaction.getUserId())) {
                NotificationDto dto = new NotificationDto();
                dto.setUserId(post.getUserId()); // post owner
                dto.setType("reaction");
                dto.setMessage(reaction.getUserName() + " reacted to your post.");
                dto.setPostId(post.getId());
                dto.setReaction(reaction.getType());

                notificationService.createNotification(dto);
            }
        }

        return saved;
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
        return reactionRepository.findByPostIdAndUserId(postId, userId).orElse(null);
    }

    public List<Reaction> getReactionsByPost(String postId) {
        return reactionRepository.findByPostId(postId);
    }

}
