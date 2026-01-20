package com.example.railway.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import com.example.railway.model.TicketBookedEvent;
import com.example.railway.model.InMemoryEventBus;

@Component
public class DeadLetterService {

    private final InMemoryEventBus eventBus;

    public DeadLetterService(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    @PostConstruct
    public void start() {
        new Thread(() -> {
            while (true) {
                try {
                    TicketBookedEvent event = eventBus.deadLetterQueue().take();
                    System.err.println("DLQ: Booking moved to booking-error-queue → " + event.getBookingId() + ", age=" + event.getAge());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }
}
