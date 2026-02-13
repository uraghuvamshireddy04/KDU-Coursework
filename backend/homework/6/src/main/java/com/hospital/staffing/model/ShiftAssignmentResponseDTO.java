package com.hospital.staffing.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShiftAssignmentResponseDTO {
    private Long assignmentId;
    private String userName;
    private String shiftName;
}