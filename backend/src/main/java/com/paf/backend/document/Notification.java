package com.paf.backend.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;

    private String userId;      // Receiver of the notification
    private String type;        // e.g., "comment", "like"
    private String message;
    private String postId;
    private boolean isRead = false;
    private String timestamp;
}
