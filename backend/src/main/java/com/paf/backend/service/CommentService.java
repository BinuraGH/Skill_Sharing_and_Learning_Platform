package com.paf.backend.service;

import com.paf.backend.document.Comment;
import com.paf.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.paf.backend.repository.SkillShareRepository;
import com.paf.backend.document.SkillSharing;
import com.paf.backend.service.NotificationService;
import com.paf.backend.dto.NotificationDto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SkillShareRepository skillShareRepository;

    @Autowired
    private NotificationService notificationService;

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
        if (comments.size() > 0) {
            return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Comment>>(new ArrayList<>(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getCommentsByPost(String postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        if (comments.size() > 0) {
            return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<Comment>>(new ArrayList<>(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> saveComment(Comment comment) {
        try {
            comment.setCreatedAt(new Date());
            comment.setUpdatedAt(new Date());
            // userName is already part of the object if passed from frontend
            Comment saved = commentRepository.save(comment);

            // 🔔 Send notification to SkillSharing post owner
            Optional<SkillSharing> skillPostOpt = skillShareRepository.findById(comment.getPostId());

            if (skillPostOpt.isPresent()) {
                SkillSharing post = skillPostOpt.get();

                // Don’t notify if user comments on their own post
                if (!post.getUserId().equals(comment.getUserId())) {
                    NotificationDto dto = new NotificationDto();
                    dto.setUserId(post.getUserId()); // post owner receives it
                    dto.setType("comment");
                    dto.setMessage(comment.getUserName() + " commented on your post.");
                    dto.setPostId(post.getId());

                    notificationService.createNotification(dto);
                }
            }
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateCommentById(String id, Comment comment) {
        Optional<Comment> existingComment = commentRepository.findById(id);
        if (existingComment.isPresent()) {
            Comment updateComment = existingComment.get();
            updateComment.setText(comment.getText());
            updateComment.setUpdatedAt(new Date(System.currentTimeMillis()));
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
