package com.kickdrum.device.service;

import com.kickdrum.device.dto.*;
import com.kickdrum.device.exception.AlreadyExistsException;
import com.kickdrum.device.exception.ConcurrentModificationException;
import com.kickdrum.device.exception.UnauthorizedException;
import com.kickdrum.device.model.House;
import com.kickdrum.device.model.Role;
import com.kickdrum.device.model.User;
import com.kickdrum.device.model.UserHouse;
import com.kickdrum.device.repository.HouseRepository;
import com.kickdrum.device.repository.UserHouseRepository;
import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class HouseService {
    private static final Logger log = LoggerFactory.getLogger(HouseService.class);

    private final HouseRepository houseRepository;
    private final UserHouseRepository userHouseRepository;
    private final UserHouseRole userHouseRole;

    public HouseService(HouseRepository houseRepository, UserHouseRepository userHouseRepository, UserHouseRole userHouseRole) {
        this.houseRepository = houseRepository;
        this.userHouseRepository = userHouseRepository;
        this.userHouseRole = userHouseRole;
    }

    /**
     * Creates a new House by the user and, he becomes admin of that house.
     * @param req It contains details of house address to be created.
     * @param username User trying to create the house.
     * @return If successfully created returns house details otherwise throws exceptions.
     */
    @Transactional
    public HouseCreateResponseDto createHouse(HouseCreateRequestDto req, String username) {
        String address = req.house_number + ", " + req.street + ", " + req.city + ", " + req.state;

        try{
            if (houseRepository.existsByAddress(address)) {
                log.warn("House already exists with address: {}", address);
                throw new AlreadyExistsException("House already exists");
            }
            House house = new House(req.house_number, req.street, req.city, req.state);
            User user = userHouseRole.findUserByUsername(username);

            house = houseRepository.save(house);
            UserHouse userHouse = new UserHouse(user, house, Role.ADMIN);

            userHouseRepository.save(userHouse);

            HouseCreateResponseDto response = new HouseCreateResponseDto(house.getAddress());

            log.info("House created successfully. Admin: {}", user.getUsername());
            return response;
        }catch(OptimisticLockException ex){
            throw  new ConcurrentModificationException("House is being created by another user. Please retry.");
        }catch(Exception ex){
            throw new RuntimeException();
        }


    }

    /**
     * Updates the address of the house and can be done only by the Admin of the house.
     * @param req It contains details of the house.
     * @param houseId id of house to be updated.
     * @param username User trying to update the house details.
     * @return Updated house details if all constraints gets pass.
     */
    public HouseCreateResponseDto updateHouse(HouseCreateRequestDto req, UUID houseId, String username){
        String address = req.house_number + ", " + req.street + ", " + req.city + ", " + req.state;
        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());
        if(userHouse.getRole() != Role.ADMIN){
            log.warn("Unauthorized, User: {} not allowed to change address of house {}", user.getId(), houseId);
            throw new UnauthorizedException("User not allowed to change address of the house");
        }
        if(houseRepository.existsByAddress(address)) {
            log.warn("House with address: {} already exists", address);
            throw new AlreadyExistsException("House already exists");
        }
        house.setHouse_number(req.house_number);
        house.setCity(req.city);
        house.setAddress(address);
        house.setStreet(req.street);
        house.setState(req.state);
        houseRepository.save(house);
        return new HouseCreateResponseDto(house.getAddress());

    }

    /**
     * Admin can add new users to the house
     * @param userId User to be added by the admin.
     * @param houseId House to which new user to be added.
     * @param username User trying to add new user to the house.
     * @return Success details if all constraints gets passed.
     */

    @Transactional
    public UserToHouseResponseDto addUserToHouse(UUID userId, UUID houseId, String username) {
        User user = userHouseRole.findUserById(userId);
        House house = userHouseRole.findHouseById(houseId);
        User adminUser = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, adminUser.getId());
        if(userHouse.getRole() != Role.ADMIN){
            log.warn("Unauthorized, User: {} not allowed to add new users to house {}", adminUser.getId(), houseId);
            throw new UnauthorizedException("User not allowed to add users to the house");
        }
        if (userHouseRepository.existsByUserIdAndHouseId(userId, houseId)) {
            throw new AlreadyExistsException("User already added to this house");
        }
        UserHouse newUserHouse = new UserHouse(user, house, Role.USER);
        userHouseRepository.save(newUserHouse);
        log.info("New user:{} added to house:{}", user.getUsername(), house.getId());

        return new UserToHouseResponseDto(user.getId(), user.getUsername(), house.getId(), house.getAddress(), Instant.now());

    }

    /**
     * Admin can transfer his power to any other user of same house.
     * @param username user trying to transfer power.
     * @param newAdminId User to get Admin power
     * @param houseId House in which power transmission is happening
     * @return Success details if all constraints gets passed.
     */
    @Transactional
    public AdminTransferDto transferAdminPower(String username, UUID newAdminId, UUID houseId){
        House house = userHouseRole.findHouseById(houseId);
        User user = userHouseRole.findUserByUsername(username);
        UserHouse userHouse = userHouseRole.findByUserIdAndHouseId(houseId, user.getId());
        if(userHouse.getRole() != Role.ADMIN){
            log.warn("User: {} not allowed change admin of house {}", user.getId(), houseId);
            throw new UnauthorizedException("User not allowed to change admin of the house");
        }

        if(user.getId().equals(newAdminId)){
            throw new AlreadyExistsException("New User is already the admin of the house");
        }
        User newUser = userHouseRole.findUserById(newAdminId);

        UserHouse newUserHouse = userHouseRepository.findByUserIdAndHouseId(newAdminId, houseId)
                .orElseThrow(() -> new UnauthorizedException("User not part of this house"));
        userHouse.setRole(Role.USER);
        newUserHouse.setRole(Role.ADMIN);
        return new AdminTransferDto(username, Role.USER, newUser.getUsername(), Role.ADMIN);

    }

    /**
     * List of all houses of the user.
     * @param username User trying to find all houses.
     * @return list of all houses of the user.
     */
    public List<ListAllUserHouses> listAllUserHouses(String username){
        User user = userHouseRole.findUserByUsername(username);
        List<UserHouse> userHouses = userHouseRepository.findAllByUserId(user.getId());
        return userHouses.stream()
                .map(userHouse -> new ListAllUserHouses(user.getUsername(), userHouse.getHouse().getAddress(), userHouse.getRole(), userHouse.getCreated_at()))
                .toList();
    }
}
