package com.kickdrum.device.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceCreateRequestDto {
    @NotBlank
    public String kickston_id;

    @NotBlank
    public String device_username;

    @NotBlank
    public String device_password;
}
