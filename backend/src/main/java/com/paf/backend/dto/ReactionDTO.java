package com.paf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReactionDTO {
    private String postId;
    private String userId;
    private String type; // e.g., "like", "heart", "celebrate"
}
