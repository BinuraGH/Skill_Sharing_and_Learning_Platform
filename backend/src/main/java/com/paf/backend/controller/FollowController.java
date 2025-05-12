package com.paf.backend.controller;

import com.paf.backend.document.Follow;
import com.paf.backend.document.User;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.repository.UserRepository;
import com.paf.backend.service.FollowService;
import com.paf.backend.service.NotificationService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService service;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    // Follow a user
    @PostMapping
    public Follow follow(@RequestParam String followerId, @RequestParam String followedId) {
        Follow follow = service.followUser(followerId, followedId);

        //Create follow notification
        String followerName = userRepository.findById(followerId)
                .map(User::getName)
                .orElse("Someone");

        NotificationDto dto = new NotificationDto();
        dto.setUserId(followedId); // receiver of the notification
        dto.setType("follow");
        dto.setMessage(followerName + " started following you.");
        dto.setPostId(null); // not related to a post

        notificationService.createNotification(dto);

        return follow;
    }

    // Unfollow a user
    @DeleteMapping
    public void unfollow(@RequestParam String followerId, @RequestParam String followedId) {
        service.unfollowUser(followerId, followedId);
    }

    // Get users that this user is following
    @GetMapping("/{userId}/following")
    public List<Follow> getFollowing(@PathVariable String userId) {
        return service.getFollowing(userId);
    }

    // Get followers of a user
    @GetMapping("/{userId}/followers")
    public List<Follow> getFollowers(@PathVariable String userId) {
        return service.getFollowers(userId);
    }
}
