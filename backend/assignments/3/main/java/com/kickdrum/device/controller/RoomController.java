package com.kickdrum.device.controller;

import com.kickdrum.device.dto.ListAllRoomsOfHouse;
import com.kickdrum.device.dto.RoomCreateRequestDto;
import com.kickdrum.device.dto.RoomCreateResponseDto;
import com.kickdrum.device.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/room")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    public String getUsername(){
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }


    @PostMapping("/{houseId}")
    public ResponseEntity<RoomCreateResponseDto> createRoom(@RequestBody @Valid RoomCreateRequestDto req, @PathVariable UUID houseId){
        return ResponseEntity.ok(roomService.createRoom(req, houseId, getUsername()));
    }

    @GetMapping("/{houseId}")
    public ResponseEntity<List<ListAllRoomsOfHouse>> listAllRooms(@PathVariable UUID houseId){
        return ResponseEntity.ok(roomService.listAllRoomsOfHouse(houseId, getUsername()));
    }
}
