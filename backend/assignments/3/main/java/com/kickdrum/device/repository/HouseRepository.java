package com.kickdrum.device.repository;

import com.kickdrum.device.model.House;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface HouseRepository extends JpaRepository<House, UUID> {
    Optional<House> findHouseByAddress(String address);
    boolean existsByAddress (String address);
}
