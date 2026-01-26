package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "user_house_roles", uniqueConstraints = @UniqueConstraint(columnNames = {"house_id", "user_id"})
)
@Getter
@Setter
@NoArgsConstructor
public class UserHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @Enumerated(EnumType.STRING)
    private Role role;

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

    public UserHouse (User user, House house, Role role) {
        this.user = user;
        this.house = house;
        this.role = role;
    }
}
