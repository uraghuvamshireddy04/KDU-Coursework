package com.kickdrum.device.service;

import com.kickdrum.device.dto.ListAllRoomsOfHouse;
import com.kickdrum.device.dto.RoomCreateRequestDto;
import com.kickdrum.device.dto.RoomCreateResponseDto;
import com.kickdrum.device.exception.AlreadyExistsException;
import com.kickdrum.device.exception.UnauthorizedException;
import com.kickdrum.device.model.*;
import com.kickdrum.device.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private static final Logger log = LoggerFactory.getLogger(RoomService.class);

    private final RoomRepository roomRepository;
    private final UserHouseRole userHouseRole;

    public RoomService(RoomRepository roomRepository, UserHouseRole userHouseRole) {
        this.roomRepository = roomRepository;
        this.userHouseRole = userHouseRole;
    }

    /**
     * Creates new room in the house and can be done be Admin only
     * @param req Details of the room
     * @param houseId House in which room to be added
     * @param username User trying to add room.
     * @return Success details if all constraints gets passed.
     */

    @Transactional
    public RoomCreateResponseDto createRoom(RoomCreateRequestDto req, UUID houseId, String username){
        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());
        if(userHouse.getRole() != Role.ADMIN){
            log.warn("Unauthorized, User: {} not allowed to add room to house {}", user.getId(), houseId);
            throw new UnauthorizedException("User not allowed to add room to the house");
        }
        if(roomRepository.existsByHouse_IdAndName(houseId, req.getName())){
            log.warn("House already exists with the room name {}",req.getName());
            throw new AlreadyExistsException("Room already exists in the house");
        }
        Room room = new Room(req.getName(), house);
        roomRepository.save(room);
        log.info("Room: {} created successfully in house:{}", req.getName(), houseId);
        return new RoomCreateResponseDto(houseId, house.getAddress(), req.getName());
    }

    /**
     * List of all Devices in the house.
     * @param houseId House in which user try to search devices.
     * @param username User trying to search devices.
     * @return list of all devices with rooms they are present in the house.
     */
    public List<ListAllRoomsOfHouse> listAllRoomsOfHouse(UUID houseId, String username){
        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());
        List<Room> listRoomsOfHouse = roomRepository.findByHouseId(houseId);

        return listRoomsOfHouse.stream()
                .map(room ->new ListAllRoomsOfHouse(houseId, room.getName(), house.getAddress(), room.getCreated_at() ))
                .toList();
    }
}
