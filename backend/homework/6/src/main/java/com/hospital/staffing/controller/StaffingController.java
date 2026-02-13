package com.hospital.staffing.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.staffing.entity.Shift;
import com.hospital.staffing.entity.ShiftType;
import com.hospital.staffing.entity.ShiftUser;
import com.hospital.staffing.entity.User;
import com.hospital.staffing.model.UserDTO;
import com.hospital.staffing.service.StaffingService;

@RestController
@RequestMapping("/api")
public class StaffingController {
    private final StaffingService staffingService;

    public StaffingController(StaffingService staffingService) {
        this.staffingService = staffingService;
    }

    @PostMapping("/users")
    public UserDTO createUser(@RequestBody UserDTO userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setRole(userDto.getRole());

        User savedUser = staffingService.saveUser(user);

        return new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getRole());
    }

    @PostMapping("/shifttypes")
    public ShiftType createShiftType(@RequestBody ShiftType type) {
        return staffingService.saveShiftType(type);
    }

    @PostMapping("/shifts/{typeId}")
    public Shift createShift(@RequestBody Shift shift, @PathVariable Long typeId) {
        return staffingService.saveShift(shift, typeId);
    }

    @PostMapping("/assign")
    public ShiftUser assignUser(@RequestParam Long userId, @RequestParam Long shiftId) {
        return staffingService.assignUserToShift(userId, shiftId);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        return ResponseEntity.ok(staffingService.getAllUsers(page, size));
    }

    @GetMapping("/shifts/new-year")
    public ResponseEntity<List<Shift>> getNewYearShifts() {
        List<Shift> shifts = staffingService.getNewYearShifts();
        return ResponseEntity.ok(shifts);
    }
}
