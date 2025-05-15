package com.paf.backend.controller;

import com.paf.backend.document.Follow;
import com.paf.backend.document.User;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.repository.UserRepository;
import com.paf.backend.service.FollowService;
import com.paf.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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

        // Create follow notification
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

    // Get users that this user is following with details
    @GetMapping("/{userId}/following")
    public List<Map<String, Object>> getFollowing(@PathVariable String userId) {
        List<Follow> followingList = service.getFollowing(userId);
        return followingList.stream().map(f -> {
            Optional<User> followedUser = userRepository.findById(f.getFollowedId());
            Map<String, Object> map = new HashMap<>();
            map.put("followedId", f.getFollowedId());
            map.put("followedName", followedUser.map(User::getName).orElse("Unknown"));
            map.put("followedProfilePicture", followedUser.map(User::getProfilePicture).orElse(""));
            return map;
        }).collect(Collectors.toList());
    }

    // Get followers of a user with details
    @GetMapping("/{userId}/followers")
    public List<Map<String, Object>> getFollowers(@PathVariable String userId) {
        List<Follow> followersList = service.getFollowers(userId);
        return followersList.stream().map(f -> {
            Optional<User> followerUser = userRepository.findById(f.getFollowerId());
            Map<String, Object> map = new HashMap<>();
            map.put("followerId", f.getFollowerId());
            map.put("followerName", followerUser.map(User::getName).orElse("Unknown"));
            map.put("followerProfilePicture", followerUser.map(User::getProfilePicture).orElse(""));
            return map;
        }).collect(Collectors.toList());
    }
}
