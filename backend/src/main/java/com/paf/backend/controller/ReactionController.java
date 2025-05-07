package com.paf.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paf.backend.document.Reaction;
import com.paf.backend.service.ReactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reactions")
@RequiredArgsConstructor
public class ReactionController {
    private final ReactionService reactionService;

    @PostMapping
    public ResponseEntity<Reaction> addReaction(@RequestBody Reaction reaction) {
        Reaction saved = reactionService.addReaction(reaction);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping
    public ResponseEntity<String> removeReaction(@RequestParam String postId,
                                                 @RequestParam String userId,
                                                 @RequestParam String postType) {
        reactionService.removeReaction(postId, userId, postType);
        return ResponseEntity.ok("Reaction removed successfully.");
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getReactionCounts(@RequestParam String postId,
                                                                @RequestParam String postType) {
        return ResponseEntity.ok(reactionService.getReactionCounts(postId, postType));
    }

    @GetMapping("/total")
    public ResponseEntity<Long> getTotalCount(@RequestParam String postId,
                                              @RequestParam String postType) {
        return ResponseEntity.ok(reactionService.getTotalCount(postId, postType));
    }
}
