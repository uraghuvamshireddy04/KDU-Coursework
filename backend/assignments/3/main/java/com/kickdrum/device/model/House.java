package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "houses")
@Getter
@Setter
@NoArgsConstructor
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String address;

    private String house_number;

    private String street;

    private String city;

    private String state;

    private Instant created_at;

    private Instant modified_at;

    private Instant deleted_at;

    @OneToMany(mappedBy = "house")
    private Set<UserHouse> userRoles;

    @OneToMany(mappedBy = "house")
    private Set<Room> rooms;

    @OneToMany(mappedBy = "house")
    private Set<DeviceRoom> devices;

    @Version
    private Long version;

    public House(String house_number, String street, String city, String state) {
        this.house_number = house_number;
        this.street = street;
        this.city = city;
        this.state = state;
        this.address = house_number + ", " + street + ", " + city + ", " + state;
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
