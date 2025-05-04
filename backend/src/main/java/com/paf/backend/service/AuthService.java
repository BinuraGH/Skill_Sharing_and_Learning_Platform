package com.paf.backend.service;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.paf.backend.document.User;
import com.paf.backend.dto.LoginDTO;
import com.paf.backend.dto.UserDto;
import com.paf.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> registerUser(UserDto userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use.");
        }

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole("USER");

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<?> getCurrentUser(Principal principal) {
        Optional<User> userOptional = userRepository.findByEmail(principal.getName());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user); // Return the full user object
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }

    public ResponseEntity<?> loginUser(LoginDTO loginDto) {
        Optional<User> optionalUser = userRepository.findByEmail(loginDto.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // You can return a token or session object here
        return ResponseEntity.ok("Login successful");
}

}

