package com.kickdrum.device.controller;

import com.kickdrum.device.dto.*;
import com.kickdrum.device.service.HouseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/house")
public class HouseController {
    private final HouseService houseService;

    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }
    public String getUsername(){
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping
    public ResponseEntity<HouseCreateResponseDto> createHouse(@RequestBody @Valid HouseCreateRequestDto req) {
        String username = getUsername();
        return ResponseEntity.ok(houseService.createHouse(req, username));
    }

    @PutMapping("/{houseId}")
    public ResponseEntity<HouseCreateResponseDto> updateResponse(@RequestBody @Valid HouseCreateRequestDto req, @PathVariable UUID houseId){
        return ResponseEntity.ok(houseService.updateHouse(req, houseId, getUsername()));
    }

    @PostMapping("/add-user")
    public ResponseEntity<UserToHouseResponseDto> addUserToHouse(@RequestParam UUID userId, @RequestParam UUID houseId) {
        String username = getUsername();
        return ResponseEntity.ok(houseService.addUserToHouse(userId, houseId, username));
    }

    @GetMapping
    public ResponseEntity<List<ListAllUserHouses>> listAllUserHouses(){
        return ResponseEntity.ok(houseService.listAllUserHouses(getUsername()));
    }

    @PatchMapping("/changeAdmin")
    public ResponseEntity<AdminTransferDto> adminPowerTransfer(@RequestParam UUID userId, @RequestParam UUID houseId){
        return ResponseEntity.ok(houseService.transferAdminPower(getUsername(), userId, houseId));
    }
}
