package com.example.eventsphere.controller;

import com.example.eventsphere.dto.LoginRequest;
import com.example.eventsphere.dto.TokenResponse;
import com.example.eventsphere.jwt.JwtService;
import com.example.eventsphere.model.Role;
import com.example.eventsphere.model.User;
import com.example.eventsphere.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepo,
                          PasswordEncoder encoder,
                          AuthenticationManager authManager,
                          JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtService = jwtService;

        addToDatabase("admin1", "admin123", Role.ADMIN);
        addToDatabase("user1", "user1", Role.USER);
        addToDatabase("user2", "user2", Role.USER);
        addToDatabase("user3", "user3", Role.USER);
    }

    private void addToDatabase(String username, String rawPassword, Role role) {
        if (!userRepo.existsByUsername(username)) {
            userRepo.save(new User(username, encoder.encode(rawPassword), role));
        }
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        UserDetails user = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(user);
        log.info("LOGIN SUCCESS user={}", user.getUsername());
        return new TokenResponse(token);
    }
}


