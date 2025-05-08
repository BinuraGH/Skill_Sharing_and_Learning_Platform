package com.paf.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.paf.backend.dto.UserDto;
import com.paf.backend.dto.LoginDTO;
import com.paf.backend.service.AuthService;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        return authService.registerUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
        return authService.loginUser(loginDto);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        System.out.println("Principal Name: " + principal.getName());
        System.out.println("Hit /me with principal: " + principal);
        return authService.getCurrentUser(principal);
    }
}

