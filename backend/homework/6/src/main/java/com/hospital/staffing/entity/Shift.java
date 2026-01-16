package com.hospital.staffing.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*; 
import lombok.*;

@Entity
@Table(name = "shifts")
@Data
@NoArgsConstructor
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shiftName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shift_type_id")
    private ShiftType shiftType;
}