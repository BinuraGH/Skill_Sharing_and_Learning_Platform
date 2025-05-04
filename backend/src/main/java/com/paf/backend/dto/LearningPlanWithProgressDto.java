package com.paf.backend.dto;

import com.paf.backend.document.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPlanWithProgressDto {
    private String id;
    private String userId;
    private String title;
    private String description;
    private String status;
    private boolean isPaid;
    private double price;
    private String thumbnailUrl;
    private String courseDescription;
    private List<Topic> topics;
    private int progressPercentage; // ✅ Extra field for progress
}
