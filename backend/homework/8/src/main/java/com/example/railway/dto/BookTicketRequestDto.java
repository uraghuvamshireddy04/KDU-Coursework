package com.example.railway.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

public class BookTicketRequestDto {
    @NotBlank
    private String name;

    @NotNull
    private Integer age;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String seatNumber;

    public String getName() { return name; }
    public Integer getAge() { return age; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getSeatNumber() { return seatNumber; }

}
