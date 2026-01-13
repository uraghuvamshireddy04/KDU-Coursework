package com.example.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hospital.dto.OnboardingDTO;
import com.example.hospital.repository.ShiftTypeJdbcRepository;
import com.example.hospital.repository.UserJdbcRepo;

@Service
public class OnboardingService {

    private final ShiftTypeJdbcRepository shiftRepo;
    private final UserJdbcRepo userRepo;

    public OnboardingService(
            ShiftTypeJdbcRepository shiftRepo,
            UserJdbcRepo userRepo) {
        this.shiftRepo = shiftRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public void onboardTenant(OnboardingDTO dto) {

        dto.shiftTypes.forEach(shiftRepo::saveShiftType);

        dto.users.forEach(userRepo::saveUser);

        // Force rollback
        if (true) {
            throw new RuntimeException("Simulated failure → rollback");
        }
    }
}
