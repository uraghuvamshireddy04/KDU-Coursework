package com.hospital.staffing.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShiftRequestDTO {
    private String shiftName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long shiftTypeId;
}