package com.kickdrum.device.controller;

import com.kickdrum.device.dto.LoginRequestDto;
import com.kickdrum.device.dto.RegisterRequestDto;
import com.kickdrum.device.dto.RegisterResponseDto;
import com.kickdrum.device.dto.TokenResponse;
import com.kickdrum.device.jwt.JwtService;
import com.kickdrum.device.model.User;
import com.kickdrum.device.repository.UserRepository;
import com.kickdrum.device.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth/api/v1")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@Valid @RequestBody RegisterRequestDto req) {
        return ResponseEntity.ok(userService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequestDto req) {
        return ResponseEntity.ok(userService.login(req));
    }
}

