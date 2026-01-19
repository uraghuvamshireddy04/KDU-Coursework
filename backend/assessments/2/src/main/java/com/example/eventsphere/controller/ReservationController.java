package com.example.eventsphere.controller;

import com.example.eventsphere.dto.ReservationDTO;
import com.example.eventsphere.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.UUID;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> reserve(@RequestBody ReservationDTO reservationDTO){
        reservationService.createReservation(reservationDTO.userName, reservationDTO.eventName);
        return ResponseEntity.ok("Event reservation is successful");
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> cancelReservation(@PathVariable UUID id){
        reservationService.cancelReservation(id);
        return ResponseEntity.ok("Reservation cancelled successfully");
    }
}
