package com.paf.backend.service;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import com.paf.backend.document.User;
import com.paf.backend.dto.CurrentUserDTO;
import com.paf.backend.dto.LoginDTO;
import com.paf.backend.dto.UserDto;
import com.paf.backend.dto.UserResponseDto;
import com.paf.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

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
        user.setBadge("None");

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<?> getCurrentUser(Principal principal) {
        // ✅ 1. Manual login
        if (principal instanceof UsernamePasswordAuthenticationToken) {
            Optional<User> userOptional = userRepository.findByEmail(principal.getName());

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                CurrentUserDTO response = new CurrentUserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.getProfilePicture(),
                        user.getBadge() // ✅ include badge
                );
                return ResponseEntity.ok(response);
            }
        }

        // ✅ 2. Google OAuth login
        if (principal instanceof OAuth2AuthenticationToken oauthToken) {
            OAuth2User oauthUser = oauthToken.getPrincipal();
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");
            String picture = oauthUser.getAttribute("picture");

            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                CurrentUserDTO response = new CurrentUserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.getProfilePicture(),
                        user.getBadge()
                );
                return ResponseEntity.ok(response);
            }

            // Return minimal profile if Google-only
            return ResponseEntity.ok(new CurrentUserDTO(
                    null, name, email, "OAUTH_USER", picture, "None"
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
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

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        Authentication auth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        return ResponseEntity.ok("Login successful");
    }

    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserResponseDto> userList = users.stream()
                .map(user -> new UserResponseDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getProfilePicture()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(userList);
    }
}
