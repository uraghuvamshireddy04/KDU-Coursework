package com.kickdrum.device.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "devices")
@Getter
@Setter
public class Device {

    @Id
    private String kickston_id;

    private String device_username;

    private String  device_password;

    private Instant manufacture_date_time;

    private String manufacture_factory_place;


}
