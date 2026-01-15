package com.example.smartlock.controller;

import com.example.smartlock.dto.LockResponse;
import com.example.smartlock.service.SmartLockService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class SmartLockController {

    private final SmartLockService smartLockService;

    public SmartLockController(SmartLockService smartLockService) {
        this.smartLockService = smartLockService;
    }

    @GetMapping("/unlock")
    public LockResponse unlock(@RequestParam String user) {
        return smartLockService.unlock(user);
    }

    @GetMapping("/battery")
    public String battery() {
        smartLockService.checkBattery();
        return "Check complete. See logs for timing.";
    }
}