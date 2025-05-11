package com.paf.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.paf.backend.dto.UserDto;
import com.paf.backend.dto.LoginDTO;
import com.paf.backend.service.AuthService;
import com.paf.backend.document.User;
import com.paf.backend.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        return authService.registerUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
        return authService.loginUser(loginDto);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(user);
    }
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
    return authService.getAllUsers();
}

}

