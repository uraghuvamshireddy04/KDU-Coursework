package com.example.railway.service;

import com.example.railway.model.PaymentEvent;
import com.example.railway.model.InMemoryEventBus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    private final InMemoryEventBus eventBus;

    public PaymentService(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    public String makePayment(String bookingId, double amount) {
        String transactionId = UUID.randomUUID().toString();
        PaymentEvent event = new PaymentEvent(transactionId, bookingId, amount);

        eventBus.publishPayment(event);

        return "Payment in progress for Booking ID: " + bookingId + ", Transaction ID: " + transactionId;
    }
}
