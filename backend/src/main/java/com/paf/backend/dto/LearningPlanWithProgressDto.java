package com.paf.backend.dto;

import com.paf.backend.document.Topic;
import java.util.List;

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
    private int progressPercentage;

    public LearningPlanWithProgressDto() {}

    public LearningPlanWithProgressDto(String id, String userId, String title, String description,
                                       String status, boolean isPaid, double price, String thumbnailUrl,
                                       String courseDescription, List<Topic> topics, int progressPercentage) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.isPaid = isPaid;
        this.price = price;
        this.thumbnailUrl = thumbnailUrl;
        this.courseDescription = courseDescription;
        this.topics = topics;
        this.progressPercentage = progressPercentage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public int getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(int progressPercentage) {
        this.progressPercentage = progressPercentage;
    }
}
