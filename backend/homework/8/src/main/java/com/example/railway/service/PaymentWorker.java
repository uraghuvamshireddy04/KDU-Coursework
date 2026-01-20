package com.example.railway.service;

import com.example.railway.model.PaymentEvent;
import com.example.railway.model.InMemoryEventBus;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class PaymentWorker {

    private final InMemoryEventBus eventBus;
    private final Set<String> processedTransactions = new HashSet<>();

    public PaymentWorker(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    @PostConstruct
    public void start() {
        new Thread(() -> {
            while (true) {
                try {
                    PaymentEvent event = eventBus.paymentQueue().take();
                    if (processedTransactions.contains(event.getTransactionId())) {
                        System.out.println("Transaction " + event.getTransactionId() + " already processed.");
                        continue;
                    }
                    System.out.println("Money Deducted for Booking " + event.getBookingId() + " Amount: " + event.getAmount());
                    processedTransactions.add(event.getTransactionId());

                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                } catch (Exception e) {
                    System.out.println("Failed to process payment. Will retry: " + e.getMessage());
                }
            }
        }).start();
    }
}
