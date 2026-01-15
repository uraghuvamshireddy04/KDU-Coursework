package com.example.smartlock.service;

import com.example.smartlock.annotation.AccessDoor;
import com.example.smartlock.annotation.MonitorBattery;
import com.example.smartlock.dto.LockResponse;
import com.example.smartlock.exception.HardwarefailureException;
import org.springframework.stereotype.Service;

@Service
public class SmartLockService {

    @AccessDoor
    public LockResponse unlock(String user) {
        if (user == null || user.trim().isEmpty()) {
            throw new HardwarefailureException("User name is empty");
        }
        System.out.println("The door is now open for " + user);
        return new LockResponse("Open", user, System.currentTimeMillis());
    }

    @MonitorBattery
    public void checkBattery() {
        System.out.println("Checking battery");
    }
}
