package com.paf.backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "enrollments")
public class Enrollment {
   @Id
    private String id;
    private String userId;
    private String planId;

    public Enrollment(String userId, String planId) {
        this.userId = userId;
        this.planId = planId;
    }

}
