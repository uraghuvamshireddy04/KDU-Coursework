package com.hospital.staffing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ShiftResponseDTO {
    private Long id;
    private String shiftName;
    private String shiftTypeName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}