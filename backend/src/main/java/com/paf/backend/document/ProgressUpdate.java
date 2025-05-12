package com.paf.backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document(collection = "progressupdates")

public class ProgressUpdate {
    @Id
    private String id;
    private String userId;
    private String title;
    private String caption;
    private String status;

    private List<String> imgLink;

    public ProgressUpdate(){}

    public ProgressUpdate(String userId, String title, String caption, String status, List<String> imgLink){
        this.userId = userId;
        this.title = title;
        this.caption = caption;
        this.status = status;
        this.imgLink = imgLink;
    }

    public String getId(){
        return id;
    }

    public String getUserId(){
        return userId;
    }

    public String getTitle(){
        return title;
    }

    public String getCaption(){
        return caption;
    }

    public String getStatus(){
        return status;
    }

    public List<String> getImgLink(){
        return imgLink;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public void setCaption(String caption){
        this.caption = caption;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public void setImgLink(List<String> imgLink){
        this.imgLink = imgLink;
    }

    public void setDateTime(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDateTime'");
    }
}



