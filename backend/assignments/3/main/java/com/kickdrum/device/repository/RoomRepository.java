package com.kickdrum.device.repository;

import com.kickdrum.device.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    boolean existsByHouse_IdAndName(UUID houseId, String roomName);
    List<Room> findByHouseId(UUID id);
}
