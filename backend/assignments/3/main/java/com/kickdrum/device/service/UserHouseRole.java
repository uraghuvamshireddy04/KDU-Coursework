package com.kickdrum.device.service;

import com.kickdrum.device.exception.NotFoundException;
import com.kickdrum.device.exception.UnauthorizedException;
import com.kickdrum.device.model.House;
import com.kickdrum.device.model.User;
import com.kickdrum.device.model.UserHouse;
import com.kickdrum.device.repository.HouseRepository;
import com.kickdrum.device.repository.UserHouseRepository;
import com.kickdrum.device.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserHouseRole {
    private final UserRepository userRepository;
    private final HouseRepository houseRepository;
    private final UserHouseRepository userHouseRepository;

    public UserHouseRole(UserRepository userRepository, HouseRepository houseRepository, UserHouseRepository userHouseRepository) {
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
        this.userHouseRepository = userHouseRepository;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User findUserById(UUID userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public House findHouseById(UUID houseId){
        return houseRepository.findById(houseId)
                .orElseThrow(()-> new NotFoundException("House not found"));
    }

    public UserHouse findByUserIdAndHouseId(UUID houseId, UUID userId){
        return userHouseRepository.findByUserIdAndHouseId(userId, houseId)
                .orElseThrow(() -> new UnauthorizedException("User not part of this house"));
    }
}
