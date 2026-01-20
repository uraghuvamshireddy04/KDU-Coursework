package com.example.railway.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.railway.dto.BookTicketRequestDto;
import com.example.railway.model.TicketBookedEvent;
import com.example.railway.model.InMemoryEventBus;

@Service
public class TicketBookService {

    private final InMemoryEventBus eventBus;

    public TicketBookService(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    public String bookTicket(BookTicketRequestDto request) {

        String bookingId = UUID.randomUUID().toString();

        TicketBookedEvent event = new TicketBookedEvent(
                bookingId,
                request.getName(),
                request.getAge(),
                request.getPhoneNumber(),
                request.getSeatNumber()
        );

        eventBus.publish(event);

        return "Booking in progress. Booking ID: " + bookingId;
    }
}
