package com.kickdrum.device.dto;

import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class RegisterResponseDto {
    public UUID id;
    public String username;
    public Instant created_at;
}
