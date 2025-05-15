package com.paf.backend.dto;

import lombok.Data;

@Data
public class NotificationDto {
    private String userId;
    private String type;
    private String message;
    private String postId;
    private String reaction;
}
