package com.hospital.staffing.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ShiftUser> shiftAssignments;
}