package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private Instant createdAt;

    private Instant modifiedAt;

    private Instant deletedAt;

    @OneToMany(mappedBy = "user")
    private Set<UserHouse> houseRoles;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @PrePersist
    public void save() {
        Instant time = Instant.now();
        this.createdAt = time;
        this.modifiedAt = time;

    }

    @PreUpdate
    public void update() {
        this.modifiedAt = Instant.now();
    }


}

