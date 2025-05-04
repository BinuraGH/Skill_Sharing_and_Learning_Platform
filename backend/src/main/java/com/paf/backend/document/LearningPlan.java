package com.paf.backend.document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

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

    public LearningPlan() {}

    public LearningPlan(String userId, String title, String description, String status, boolean isPaid, double price, String thumbnailUrl, String courseDescription, List<Topic> topics) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.isPaid = isPaid;
        this.price = price;
        this.thumbnailUrl = thumbnailUrl;
        this.courseDescription = courseDescription;
        this.topics = topics;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public double getPrice() {
        return price;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }



    /*  */
}
