package com.paf.backend.document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Topic {
    private String title;
    private String description;
    private boolean completed;
    private String videoUrl;
}
