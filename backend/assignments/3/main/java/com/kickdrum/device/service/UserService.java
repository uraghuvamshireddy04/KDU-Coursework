package com.kickdrum.device.service;

import com.kickdrum.device.dto.LoginRequestDto;
import com.kickdrum.device.dto.RegisterRequestDto;
import com.kickdrum.device.dto.RegisterResponseDto;
import com.kickdrum.device.dto.TokenResponse;
import com.kickdrum.device.jwt.JwtService;
import com.kickdrum.device.model.User;
import com.kickdrum.device.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public UserService(UserRepository userRepo, PasswordEncoder encoder, AuthenticationManager authManager, JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    public RegisterResponseDto register(RegisterRequestDto req) {
        if (userRepo.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User(req.getUsername(), encoder.encode(req.getPassword())
        );

        User saved = userRepo.save(user);
        RegisterResponseDto responseDto = new RegisterResponseDto();
        responseDto.id = saved.getId();
        responseDto.username = saved.getUsername();
        responseDto.created_at = saved.getCreatedAt();

        log.info("Registered Successfully user={}", user.getUsername());
        return responseDto;
    }

    public TokenResponse login(LoginRequestDto req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        UserDetails user = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(user);

        log.info("LOGIN SUCCESS user={}", user.getUsername());
        return new TokenResponse(token);
    }
}
