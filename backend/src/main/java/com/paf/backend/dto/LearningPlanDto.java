package com.paf.backend.dto;

import com.paf.backend.document.Topic;
import java.util.List;

public class LearningPlanDto {

    private String userId;
    private String title;
    private String description;
    private boolean isPaid;
    private double price;
    private String thumbnailUrl;
    private String courseDescription;
    private List<Topic> topics;

    public LearningPlanDto() {}

    public LearningPlanDto(String userId, String title, String description, boolean isPaid, double price,
                           String thumbnailUrl, String courseDescription, List<Topic> topics) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.isPaid = isPaid;
        this.price = price;
        this.thumbnailUrl = thumbnailUrl;
        this.courseDescription = courseDescription;
        this.topics = topics;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }
}
