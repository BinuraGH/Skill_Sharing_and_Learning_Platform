package com.paf.backend.document;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skill_sharing")
public class SkillSharing {

    @Id
    private String id;
    private String userId;
    private String uname;
    private List<String> media; // Size limit will be handled in validation
    private String description;
    private LocalDateTime dateTime;
    private String profilePicture;

    public SkillSharing() {
    }

    public SkillSharing(String userId, String uname, List<String> media, String description, LocalDateTime dateTime) {
        this.userId = userId;
        this.uname = uname;
        this.media = media;
        this.description = description;
        this.dateTime = dateTime;
        
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
    public String getProfilePicture() {
        return profilePicture;
    }
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
