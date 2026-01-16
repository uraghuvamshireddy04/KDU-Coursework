package com.hospital.staffing.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hospital.staffing.entity.Shift;
import com.hospital.staffing.entity.ShiftType;
import com.hospital.staffing.entity.ShiftUser;
import com.hospital.staffing.entity.User;
import com.hospital.staffing.exception.ResourceNotFoundException;
import com.hospital.staffing.repo.ShiftRepository;
import com.hospital.staffing.repo.ShiftTypeRepository;
import com.hospital.staffing.repo.ShiftUserRepository;
import com.hospital.staffing.repo.UserRepository;

@Service
public class StaffingService {
    private final UserRepository userRepository;
    private final ShiftTypeRepository shiftTypeRepository;
    private final ShiftRepository shiftRepository;
    private final ShiftUserRepository shiftUserRepository;
    public StaffingService(UserRepository userRepository, ShiftRepository shiftRepository, ShiftTypeRepository shiftTypeRepository, ShiftUserRepository shiftUserRepository) {
        this.shiftRepository = shiftRepository;
        this.userRepository = userRepository;
        this.shiftTypeRepository = shiftTypeRepository;
        this.shiftUserRepository = shiftUserRepository;
    }
    private static final Logger logger = LoggerFactory.getLogger(StaffingService.class);

    public User saveUser(User user) {
        logger.info("Attempting to save user: {}", user.getName());
        return userRepository.save(user);
    }

    public ShiftType saveShiftType(ShiftType type) {
        logger.info("Attempting to save ShiftType: {}", type.getName());
        return shiftTypeRepository.save(type);
    }

    public Shift saveShift(Shift shift, Long shiftTypeId ) {
        logger.info("Attempting to save shift: {}", shift.getShiftName());
        ShiftType type = shiftTypeRepository.findById(shiftTypeId)
                .orElseThrow(()-> new RuntimeException("ShiftType ID " + shiftTypeId + " not found"));
        shift.setShiftType(type);
        return shiftRepository.save(shift);
    }

    public ShiftUser assignUserToShift(Long userId, Long shiftId) {
        logger.info("Attempting to assign task {} to {}:",userId, shiftId);
        User user = userRepository.findById(userId)
                .orElseThrow(() ->{
                    logger.warn("Assignment Failed: User {} not found", userId);
                    return new ResourceNotFoundException("User not found");
                });
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> {
                    logger.error("Assignment Failed: Critical Error - Shift {} does not exist in DB", shiftId);
                    return new ResourceNotFoundException("Shift not found");
                });

        ShiftUser assignment = new ShiftUser();
        assignment.setUser(user);
        assignment.setShift(shift);
        ShiftUser saved = shiftUserRepository.save(assignment);
        logger.info("Successfully assigned {} to shift {}. Assignment ID: {}", user.getName(), shift.getShiftName(), saved.getId());

        return saved;    }

    public Page<User> getAllUsers(int page, int size) {
        logger.info("Fetching users for page {} with size {}", page, size);

        // Requirement: Min 1, Max 50
        if (size < 1) size = 1;
        if (size > 50) {
            logger.warn("Requested size {} exceeded limit. Capping at 50.", size);
            size = 50;
        }

        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public List<Shift> getNewYearShifts() {
        LocalDateTime start = LocalDateTime.of(2023, 1, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2023, 1, 25, 23, 59);

        logger.info("Searching for Top 3 shifts between {} and {}", start, end);

        return shiftRepository.findTop3ByDateRange(start, end, PageRequest.of(0, 3));
    }
}
