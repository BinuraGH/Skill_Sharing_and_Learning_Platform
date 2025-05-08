package com.paf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrentUserDTO {
    private String id;
    private String name;
    private String email;
    private String role;
}
