package com.kickdrum.device.dto;

import com.kickdrum.device.model.Role;
import lombok.Getter;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Getter
public class LoginResponseDto {
    public UUID id;
    public String username;
    public Instant created_at;
    public Instant modified_at;

}
