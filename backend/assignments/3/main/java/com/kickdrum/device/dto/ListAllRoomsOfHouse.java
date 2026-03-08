package com.kickdrum.device.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListAllRoomsOfHouse {
    public UUID houseId;
    public String roomName;
    public String address;
    public Instant created_at;
}
