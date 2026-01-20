package com.example.railway.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TicketBookedEvent {

    private String bookingId;
    private String name;
    private Integer age;
    private String phoneNumber;
    private String seatNumber;

    public TicketBookedEvent(String bookingId, String name, int age, String phoneNumber, String seatNumber) {
        this.bookingId = bookingId;
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.seatNumber = seatNumber;
    }

    private int retryCount = 0;

    public void incrementRetry() {
        this.retryCount++;
    }

}
