package com.paf.backend.service;

import com.paf.backend.document.Comment;
import com.paf.backend.document.SkillSharing;
import com.paf.backend.document.User;
import com.paf.backend.dto.CommentDTO;
import com.paf.backend.dto.NotificationDto;
import com.paf.backend.repository.CommentRepository;
import com.paf.backend.repository.SkillShareRepository;
import com.paf.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SkillShareRepository skillShareRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getCommentById(String id) {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isPresent()) {
            return new ResponseEntity<>(comment.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Comment Found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getComments() {
        List<Comment> comments = commentRepository.findAll();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    public ResponseEntity<?> getCommentsByPost(String postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);

        List<CommentDTO> commentDtos = comments.stream().map(comment -> {
            String profilePic = userRepository.findById(comment.getUserId())
                    .map(User::getProfilePicture)
                    .orElse("");

            CommentDTO dto = new CommentDTO();
            dto.setId(comment.getId());
            dto.setText(comment.getText());
            dto.setUserId(comment.getUserId());
            dto.setUserName(comment.getUserName());
            dto.setPostId(comment.getPostId());
            dto.setCreatedAt(comment.getCreatedAt());
            dto.setUpdatedAt(comment.getUpdatedAt());
            dto.setProfileImage(profilePic); // ✅ set profile picture
            return dto;
        }).collect(Collectors.toList());

        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

    public ResponseEntity<?> saveComment(Comment comment) {
        try {
            comment.setCreatedAt(new Date());
            comment.setUpdatedAt(new Date());
            Comment saved = commentRepository.save(comment);

            Optional<SkillSharing> skillPostOpt = skillShareRepository.findById(comment.getPostId());

            if (skillPostOpt.isPresent()) {
                SkillSharing post = skillPostOpt.get();

                if (!post.getUserId().equals(comment.getUserId())) {
                    NotificationDto dto = new NotificationDto();
                    dto.setUserId(post.getUserId());
                    dto.setType("comment");
                    dto.setMessage(comment.getUserName() + " commented on your post.");
                    dto.setPostId(post.getId());

                    notificationService.createNotification(dto);
                }
            }

            return new ResponseEntity<>(saved, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateCommentById(String id, Comment comment) {
        Optional<Comment> existingComment = commentRepository.findById(id);
        if (existingComment.isPresent()) {
            Comment updateComment = existingComment.get();
            updateComment.setText(comment.getText());
            updateComment.setUpdatedAt(new Date());
            return new ResponseEntity<>(commentRepository.save(updateComment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteCommentById(String id) {
        try {
            commentRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
