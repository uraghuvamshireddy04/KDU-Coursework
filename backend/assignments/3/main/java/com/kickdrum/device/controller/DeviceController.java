package com.kickdrum.device.controller;

import com.kickdrum.device.dto.*;
import com.kickdrum.device.service.DeviceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/device")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    public String getUsername(){
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/{houseId}")
    public ResponseEntity<DeviceResponseDto> addDeviceToHouse(@RequestBody @Valid DeviceCreateRequestDto req, @PathVariable UUID houseId){
        return ResponseEntity.ok(deviceService.addDeviceToHouse(req,getUsername(), houseId));
    }

    @PutMapping
    public ResponseEntity<DeviceRoomResponseDto> addDeviceToRoom(@RequestParam UUID roomId, @RequestParam String deviceId){
        return ResponseEntity.ok(deviceService.addDeviceToRoom(deviceId, roomId, getUsername()));
    }

    @GetMapping("/{houseId}")
    public ResponseEntity<List<ListAllDevicesInRoomDto>> getAllDevicesOfHouse(@PathVariable UUID houseId){
        return ResponseEntity.ok(deviceService.listAllDevicesInRoom(houseId, getUsername()));
    }
}
