package com.paf.backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "reactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reaction {
     @Id
    private String id;

    private String postId;
    private String userId;
    private String postType; // "skill", "plan", "progress"
    private String type;     // "like", "heart", "celebrate"
}
