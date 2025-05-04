package com.paf.backend.service;

import com.paf.backend.document.Follow;
import com.paf.backend.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository repository;

    public Follow followUser(String followerId, String followedId) {
        if (repository.existsByFollowerIdAndFollowedId(followerId, followedId)) {
            throw new IllegalArgumentException("Already following this user.");
        }

        Follow follow = new Follow(null, followerId, followedId);
        return repository.save(follow);
    }

    public void unfollowUser(String followerId, String followedId) {
        repository.deleteByFollowerIdAndFollowedId(followerId, followedId);
    }

    public List<Follow> getFollowing(String followerId) {
        return repository.findByFollowerId(followerId);
    }

    public List<Follow> getFollowers(String followedId) {
        return repository.findByFollowedId(followedId);
    }
}
