package com.paf.backend.dto;

import java.util.Date;

import lombok.Data;

@Data
public class CommentDTO {
    private String id;
    private String text;
    private String userId;
    private String userName;
    private String profileImage;
    private String postId;
    private Date createdAt;
    private Date updatedAt;
}
