package com.paf.backend.dto;

import java.util.List;

public class ProgressUpdateDto {
    private String id;
    private String userId;
    private String title;
    private String caption;
    private List<String> imgLink;
    private String status;

    public ProgressUpdateDto() {}

    public ProgressUpdateDto(String userId, String title, String caption, List<String> imgLink, String status) {
        this.userId = userId;
        this.title = title;
        this.caption = caption;
        this.imgLink = imgLink;
        this.status = status;
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

    public String getCaption() {
        return caption;
    }

    public List<String> getImgLink() {
        return imgLink;
    }

    public String getStatus() {
        return status;
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

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public void setImgLink(List<String> imgLink) {
        this.imgLink = imgLink;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}