package com.kickdrum.device.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceRoomResponseDto {
    public String kickston_id;
    public String device_username;
    public UUID houseId;
    public UUID roomId;
    public String roomName;
    public String address;
}

