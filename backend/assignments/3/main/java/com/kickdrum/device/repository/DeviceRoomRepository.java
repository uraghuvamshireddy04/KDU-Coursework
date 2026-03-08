package com.kickdrum.device.repository;


import com.kickdrum.device.model.DeviceRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeviceRoomRepository extends JpaRepository<DeviceRoom, String> {
    List<DeviceRoom> findByHouseId(UUID houseId);
}
