package com.kickdrum.device.service;

import com.kickdrum.device.dto.DeviceRoomResponseDto;
import com.kickdrum.device.exception.NotFoundException;
import com.kickdrum.device.model.*;
import com.kickdrum.device.repository.DeviceRoomRepository;
import com.kickdrum.device.repository.RoomRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DeviceServiceTest {

    @Mock
    private DeviceRoomRepository deviceRoomRepository;
    @Mock
    private RoomRepository roomRepository;
    @Mock
    private UserHouseRole userHouseRole;

    @InjectMocks
    private DeviceService deviceService;

    @Test
    void testAddDeviceToRoom_success() {
        UUID roomId = UUID.randomUUID();
        String deviceId = "000001";
        String username = "user";

        User user = new User();
        user.setId(UUID.randomUUID());
        Room room = new Room();
        room.setId(roomId);
        House house = new House();
        house.setId(UUID.randomUUID());
        room.setHouse(house);

        DeviceRoom deviceRoom = new DeviceRoom();
        deviceRoom.setKickston_id(deviceId);
        deviceRoom.setHouse(house);
        UserHouse userHouse = new UserHouse();
        userHouse.setRole(Role.ADMIN);
        when(userHouseRole.findUserByUsername(username)).thenReturn(user);
        when(roomRepository.findById(roomId)).thenReturn(Optional.of(room));
        when(deviceRoomRepository.findById(deviceId)).thenReturn(Optional.of(deviceRoom));
        when(userHouseRole.findByUserIdAndHouseId(house.getId(), user.getId())).thenReturn(userHouse);

        DeviceRoomResponseDto response = deviceService.addDeviceToRoom(deviceId, roomId, username);
        assertEquals(deviceId, response.getKickston_id());
        assertEquals(roomId, response.getRoomId());
        verify(deviceRoomRepository).save(deviceRoom);
    }

    @Test
    void testAddDeviceToRoomAndRoomNotFound() {
        UUID roomId = UUID.randomUUID();
        String deviceId = "000001";
        String username = "user";

        when(roomRepository.findById(roomId)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> deviceService.addDeviceToRoom(deviceId, roomId, username));
    }
}
