package com.example.hospital.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hospital.dto.UserRequestDTO;
import com.example.hospital.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public String create(@RequestBody UserRequestDTO dto) {
        service.createUser(dto);
        return "User created";
    }

    @GetMapping
    public List<Map<String, Object>> list(
            @RequestParam UUID tenantId,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "ASC") String sort) {

        return service.getUsers(tenantId, page, size, sort);
    }

    @PutMapping("/{id}")
    public String update(
            @PathVariable UUID id,
            @RequestParam String username,
            @RequestParam String timezone) {

        service.updateUser(id, username, timezone);
        return "User updated";
    }
}
