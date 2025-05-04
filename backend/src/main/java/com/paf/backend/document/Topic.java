package com.paf.backend.document;

public class Topic {
    private String title;
    private String description;
    private boolean completed;
    private String videoUrl;

    public Topic() {}

    public Topic(String title, String description, boolean completed, String videoUrl) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.videoUrl = videoUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
   
}
