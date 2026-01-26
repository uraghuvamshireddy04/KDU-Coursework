package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "device_rooms", uniqueConstraints = @UniqueConstraint(columnNames = {"room_id", "kickston_id"}))
@Getter
@Setter
public class DeviceRoom {

    @Id
    private String kickston_id;

    private String device_username;

    private String  device_password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    private Instant created_at;

    private Instant modified_at;

    private Instant deleted_at;

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
