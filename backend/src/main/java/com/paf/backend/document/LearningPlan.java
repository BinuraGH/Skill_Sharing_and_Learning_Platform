package com.paf.backend.document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "learningPlans")
public class LearningPlan {

    @Id
    private String id;
    private String userId;
    private String title;
    private String description;
    private String status; // In Progress, Completed
    private boolean isPaid;
    private double price;
    private String thumbnailUrl;
    private String courseDescription;
    private List<Topic> topics;
    /*  */
}
