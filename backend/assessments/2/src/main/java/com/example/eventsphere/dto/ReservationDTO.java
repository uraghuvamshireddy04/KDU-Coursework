package com.example.eventsphere.dto;

import jakarta.validation.constraints.NotBlank;

public class ReservationDTO {
    @NotBlank
    public String userName;

    @NotBlank
    public String eventName;
}

