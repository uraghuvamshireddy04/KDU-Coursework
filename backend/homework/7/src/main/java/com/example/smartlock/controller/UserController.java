package com.example.smartlock.controller;

import com.example.smartlock.dto.UserDTO;
import com.example.smartlock.model.User;
import com.example.smartlock.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User save(@RequestBody UserDTO userDTO) {
        return userService.save(userDTO.getName());
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return userService.findById(id);
    }
}
