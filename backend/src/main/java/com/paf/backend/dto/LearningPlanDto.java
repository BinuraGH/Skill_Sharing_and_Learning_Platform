package com.paf.backend.dto;

import com.paf.backend.document.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningPlanDto {
    
    private String userId;
    private String title;
    private String description;
    private Boolean isPaid;
    private Double price;
    private String thumbnailUrl;
    private String courseDescription;
    private List<Topic> topics;
}
