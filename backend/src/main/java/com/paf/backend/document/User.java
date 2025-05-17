package com.paf.backend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    private String profilePicture;

    // ✅ Add these fields
    private String role;    // e.g., USER, ADMIN
    private String badge;   // e.g., None, Bronze, Silver, Gold
}
