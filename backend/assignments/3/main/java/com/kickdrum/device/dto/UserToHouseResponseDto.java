package com.kickdrum.device.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserToHouseResponseDto {

    private UUID userId;
    private String username;
    private UUID houseId;
    private String address;
    private Instant createdAt;
}

