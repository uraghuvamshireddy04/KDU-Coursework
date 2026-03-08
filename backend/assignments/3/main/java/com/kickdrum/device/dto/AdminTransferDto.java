package com.kickdrum.device.dto;

import com.kickdrum.device.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminTransferDto {
    public String admin;
    public Role role;
    public String newAdmin;
    public Role newRole;
}
