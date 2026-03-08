package com.kickdrum.device.repository;

import com.kickdrum.device.model.UserHouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserHouseRepository extends JpaRepository<UserHouse, UUID> {
    Optional<UserHouse> findByUserIdAndHouseId(UUID userId, UUID houseId);
    List<UserHouse> findAllByUserId(UUID userId);
    List<UserHouse> findAllByHouseId(UUID houseId);
    boolean existsByUserIdAndHouseId(UUID userId, UUID houseId);
}
