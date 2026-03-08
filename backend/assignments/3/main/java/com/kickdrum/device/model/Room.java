package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "rooms", uniqueConstraints = @UniqueConstraint(columnNames = {"house_id", "name"})
)
@Getter
@Setter
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @OneToMany(mappedBy = "room")
    private Set<DeviceRoom> devices;

    private Instant created_at;

    private Instant modified_at;

    private Instant deleted_at;

    public Room(String name, House house){
        this.name = name;
        this.house = house;
    }

    @PrePersist
    public void save() {
        Instant time = Instant.now();
        this.created_at = time;
        this.modified_at = time;

    }

    @PreUpdate
    public void update() {
        this.modified_at = Instant.now();
    }
}
