package com.kickdrum.device;

import com.kickdrum.device.model.*;
import com.kickdrum.device.repository.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class DeviceRoomIntegrationTest {

    private final MockMvc mockMvc;
    private final HouseRepository houseRepository;
    private final RoomRepository roomRepository;
    private final DeviceRepository deviceRepository;
    private final DeviceRoomRepository deviceRoomRepository;
    private final UserRepository userRepository;
    private final UserHouseRepository userHouseRepository;

    @Autowired
    DeviceRoomIntegrationTest(MockMvc mockMvc, HouseRepository houseRepository, RoomRepository roomRepository, DeviceRepository deviceRepository, DeviceRoomRepository deviceRoomRepository, UserRepository userRepository, UserHouseRepository userHouseRepository
    ) {
        this.mockMvc = mockMvc;
        this.houseRepository = houseRepository;
        this.roomRepository = roomRepository;
        this.deviceRepository = deviceRepository;
        this.deviceRoomRepository = deviceRoomRepository;
        this.userRepository = userRepository;
        this.userHouseRepository = userHouseRepository;
    }

    @Test
    @WithMockUser(username = "testuser1")
    @Transactional
    void testListRoomsAndDevicesInHouse() throws Exception {
        User user = new User();
        user.setUsername("testuser1");
        userRepository.save(user);
        House house = new House("A1", "hsr", "Ben", "Karnataka");
        houseRepository.save(house);

        UserHouse userHouse = new UserHouse(user, house, Role.ADMIN);
        userHouseRepository.save(userHouse);

        Room room = new Room("Hall", house);
        roomRepository.save(room);
        Device device = new Device();
        device.setKickston_id("000003");
        device.setDevice_username("device_3");
        device.setDevice_password("pass_3");
        deviceRepository.save(device);
        DeviceRoom deviceRoom = new DeviceRoom();
        deviceRoom.setKickston_id(device.getKickston_id());
        deviceRoom.setDevice_username(device.getDevice_username());
        deviceRoom.setDevice_password(device.getDevice_password());
        deviceRoom.setHouse(house);
        deviceRoom.setRoom(room);
        deviceRoomRepository.save(deviceRoom);
        mockMvc.perform(get("/api/v1/device/{houseId}", house.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].roomName").value("Hall"))
                .andExpect(jsonPath("$[0].deviceId").value("000003"));
    }
}
