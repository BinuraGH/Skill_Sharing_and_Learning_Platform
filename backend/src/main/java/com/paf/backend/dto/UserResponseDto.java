package com.paf.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String name;
    private String email;
    private String profilePicture;

    // ✅ Optional: add badge or role if needed later
}
