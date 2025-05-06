package com.paf.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class SkillShareDto {
    private String userId;
    private List<String> media;
    private String description;
    private LocalDateTime dateTime;

    public SkillShareDto() {
    }

    public SkillShareDto(String userId, List<String> media, String description, LocalDateTime dateTime) {
        this.userId = userId;
        this.media = media;
        this.description = description;
        this.dateTime = dateTime;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getMedia() {
        return media;
    }

    public void setMedia(List<String> media) {
        this.media = media;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
