package com.paf.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class SkillShareDto {
    private String userId;
    private String uname;
    private List<String> media;
    private String description;
    private LocalDateTime dateTime;

    public SkillShareDto() {
    }

    public SkillShareDto(String userId, String uname, List<String> media, String description, LocalDateTime dateTime) {
        this.userId = userId;
        this.uname = uname;
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

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
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
