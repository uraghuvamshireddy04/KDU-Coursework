package com.kickdrum.device.service;

import com.kickdrum.device.dto.*;
import com.kickdrum.device.exception.AlreadyExistsException;
import com.kickdrum.device.exception.NotFoundException;
import com.kickdrum.device.exception.UnauthorizedException;
import com.kickdrum.device.model.*;
import com.kickdrum.device.repository.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DeviceService {
    private static final Logger log = LoggerFactory.getLogger(DeviceService.class);

    private final DeviceRoomRepository deviceRoomRepository;
    private final DeviceRepository deviceRepository;
    private final RoomRepository roomRepository;
    private final UserHouseRole userHouseRole;

    public DeviceService(DeviceRoomRepository deviceRoomRepository, DeviceRepository deviceRepository, RoomRepository roomRepository, UserHouseRole userHouseRole) {
        this.deviceRoomRepository = deviceRoomRepository;
        this.deviceRepository = deviceRepository;
        this.roomRepository = roomRepository;
        this.userHouseRole = userHouseRole;
    }

    /**
     * Adds device to the house.
     * @param req The details of the device.
     * @param username User trying to add device.
     * @param houseId House in which device to be added.
     * @return device and house details.
     */
    @Transactional
    public DeviceResponseDto addDeviceToHouse(DeviceCreateRequestDto req, String username, UUID houseId) {

        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());

        if (userHouse.getRole() != Role.ADMIN) {
            throw new UnauthorizedException("Only ADMIN can add devices");
        }

        Device device = deviceRepository.findById(req.getKickston_id())
                .orElseThrow(() -> new NotFoundException("Device not found in inventory"));
        if (deviceRoomRepository.existsById(device.getKickston_id())) {
            throw new AlreadyExistsException("Device already assigned to a house");
        }

        if (!device.getDevice_username().equals(req.getDevice_username()) ||
                !device.getDevice_password().equals(req.getDevice_password())) {
            throw new UnauthorizedException("Invalid device credentials");
        }

        DeviceRoom deviceRoom = new DeviceRoom();
        deviceRoom.setKickston_id(device.getKickston_id());
        deviceRoom.setDevice_username(device.getDevice_username());
        deviceRoom.setDevice_password(device.getDevice_password());
        deviceRoom.setHouse(house);

        deviceRoomRepository.save(deviceRoom);

        log.info("Device {} added to house {}", device.getKickston_id(), houseId);

        return new DeviceResponseDto(device.getKickston_id(), device.getDevice_username(), houseId, house.getAddress()
        );
    }

    /**
     * Adds device to the room or move from one room to another and check all constraints before adding.
     * @param deviceId The id of device
     * @param roomId The id of room.
     * @param username Name of user trying to insert.
     * @return Device and Room details if successfully added.
     */

    @Transactional
    public DeviceRoomResponseDto addDeviceToRoom(String deviceId, UUID roomId, String username) {
        User user = userHouseRole.findUserByUsername(username);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Room not found"));
        House house = room.getHouse();
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(house.getId(), user.getId());

        DeviceRoom deviceRoom = deviceRoomRepository.findById(deviceId)
                .orElseThrow(() -> new NotFoundException("Device not assigned yet"));

        if (!deviceRoom.getHouse().getId().equals(house.getId())) {
            throw new UnauthorizedException("Device does not belong to this house");
        }
        deviceRoom.setRoom(room);
        deviceRoomRepository.save(deviceRoom);

        log.info("Device {} added to room {}", deviceId, roomId);

        return new DeviceRoomResponseDto(deviceRoom.getKickston_id(), deviceRoom.getDevice_username(), house.getId(), roomId, room.getName(), house.getAddress()
        );
    }

    /**
     * List all devices present in the house.
     * @param houseId The id of the house.
     * @param username User trying to search devices in the house.
     * @return List of all devices in the house.
     */
    public List<ListAllDevicesInRoomDto> listAllDevicesInRoom(UUID houseId, String username){
        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());
        List<DeviceRoom> response = deviceRoomRepository.findByHouseId(houseId);
        return response.stream()
                .map(res -> new ListAllDevicesInRoomDto(res.getRoom() != null ? res.getRoom().getId() : null,
                        res.getRoom() != null ? res.getRoom().getName() : "Unassigned",
                        res.getKickston_id(), res.getDevice_username(), res.getCreated_at()))
                .toList();

    }

}
