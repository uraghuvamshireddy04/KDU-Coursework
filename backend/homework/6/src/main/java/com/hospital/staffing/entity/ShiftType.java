package com.hospital.staffing.entity;

import java.util.List;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "shift_types")
@Data
@NoArgsConstructor
public class ShiftType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @ToString.Exclude 
    @OneToMany(mappedBy = "shiftType", cascade = CascadeType.ALL)
    private List<Shift> shifts;
}