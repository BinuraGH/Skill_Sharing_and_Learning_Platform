package com.paf.backend.controller;

import com.paf.backend.document.Follow;
import com.paf.backend.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService service;

    //Follow a user
    @PostMapping
    public Follow follow(@RequestParam String followerId, @RequestParam String followedId) {
        return service.followUser(followerId, followedId);
    }

    //Unfollow a user
    @DeleteMapping
    public void unfollow(@RequestParam String followerId, @RequestParam String followedId) {
        service.unfollowUser(followerId, followedId);
    }

    //Get users that this user is following
    @GetMapping("/{userId}/following")
    public List<Follow> getFollowing(@PathVariable String userId) {
        return service.getFollowing(userId);
    }

    //Get followers of a user
    @GetMapping("/{userId}/followers")
    public List<Follow> getFollowers(@PathVariable String userId) {
        return service.getFollowers(userId);
    }
}

