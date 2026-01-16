package com.example.hospital.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.dto.ShiftTypeDTO;
import com.example.hospital.repository.ShiftTypeJdbcRepository;

@RestController
@RequestMapping("/shift-types")
public class ShiftTypeController {

    private final ShiftTypeJdbcRepository repo;

    public ShiftTypeController(ShiftTypeJdbcRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public String create(@RequestBody ShiftTypeDTO dto) {
        repo.saveShiftType(dto);
        return "Shift type created";
    }
}
