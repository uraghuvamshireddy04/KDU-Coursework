package com.kickdrum.device.service;

import com.kickdrum.device.dto.ListAllUserHouses;
import com.kickdrum.device.model.*;
import com.kickdrum.device.repository.UserHouseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
class HouseServiceTest {

    @Mock
    private UserHouseRole userHouseRole;
    @Mock
    private UserHouseRepository userHouseRepository;

    @InjectMocks
    private HouseService houseService;

    @Test
    void testListAllUserHousesSuccess() {
        String username = "user";

        User user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername(username);

        House house1 = new House();
        house1.setAddress("A1, hsr");
        UserHouse uh1 = new UserHouse();
        uh1.setHouse(house1);
        uh1.setRole(Role.ADMIN);
        uh1.setCreated_at(Instant.now());

        when(userHouseRole.findUserByUsername(username)).thenReturn(user);
        when(userHouseRepository.findAllByUserId(user.getId())).thenReturn(List.of(uh1));

        List<ListAllUserHouses> result = houseService.listAllUserHouses(username);

        assertEquals(1, result.size());
        assertEquals("A1, hsr", result.get(0).getAddress());
    }
}

