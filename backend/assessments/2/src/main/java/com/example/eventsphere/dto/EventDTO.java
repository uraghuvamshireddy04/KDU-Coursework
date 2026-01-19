package com.example.eventsphere.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EventDTO {
    @NotBlank
    private String name;

    @NotBlank
    @Positive
    private Integer tickets;
}
