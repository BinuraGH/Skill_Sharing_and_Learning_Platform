package com.paf.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.paf.backend.document.Reaction;
import com.paf.backend.dto.ReactionDTO;
import com.paf.backend.service.ReactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reactions")
@RequiredArgsConstructor
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping
    public ResponseEntity<Reaction> addReaction(@RequestBody ReactionDTO request) {
        Reaction saved = reactionService.addReaction(request);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping
    public ResponseEntity<String> removeReaction(@RequestParam String postId,
                                                 @RequestParam String userId) {
        reactionService.removeReaction(postId, userId);
        return ResponseEntity.ok("Reaction removed successfully.");
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getReactionCounts(@RequestParam String postId) {
        return ResponseEntity.ok(reactionService.getReactionCounts(postId));
    }

    @GetMapping("/total")
    public ResponseEntity<Long> getTotalCount(@RequestParam String postId) {
        return ResponseEntity.ok(reactionService.getTotalCount(postId));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserReaction(@RequestParam String postId,
                                            @RequestParam String userId,
                                            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Reaction reaction = reactionService.getUserReaction(postId, userId);

        if (reaction == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(reaction);
    }

    @GetMapping("/post")
    public ResponseEntity<?> getReactionsByPost(@RequestParam String postId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<Reaction> reactions = reactionService.getReactionsByPost(postId);
        return ResponseEntity.ok(reactions);
    }

}
