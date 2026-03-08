package com.kickdrum.device.dto;

import com.kickdrum.device.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListAllUserHouses {
    public String username;
    public String address;
    public Role role;
    public Instant created_at;

}
