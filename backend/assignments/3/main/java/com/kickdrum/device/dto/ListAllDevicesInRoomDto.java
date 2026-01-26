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
public class ListAllDevicesInRoomDto {
    public UUID roomId;
    public String roomName;
    public String deviceId;
    public String device_username;
    public Instant created_at;
}
