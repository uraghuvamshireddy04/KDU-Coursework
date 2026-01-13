package com.example.hospital.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.dto.OnboardingDTO;
import com.example.hospital.service.OnboardingService;

@RestController
@RequestMapping("/onboard")
public class OnboardingController {

    private final OnboardingService service;

    public OnboardingController(OnboardingService service) {
        this.service = service;
    }

    @PostMapping
    public String onboard(@RequestBody OnboardingDTO dto) {
        service.onboardTenant(dto);
        return "Onboarding successful";
    }
}
