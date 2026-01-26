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
public class HouseCreateRequestDto {
    @NotBlank
    public String house_number;

    @NotBlank
    public String street;

    @NotBlank
    public String city;

    @NotBlank
    public String state;
}
