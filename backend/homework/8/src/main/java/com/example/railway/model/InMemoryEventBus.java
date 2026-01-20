package com.example.railway.model;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.stereotype.Component;

import com.example.railway.model.TicketBookedEvent;

@Component
public class InMemoryEventBus {

    private final BlockingQueue<TicketBookedEvent> inventoryQueue = new LinkedBlockingQueue<>();
    private final BlockingQueue<TicketBookedEvent> notificationQueue = new LinkedBlockingQueue<>();
    private final BlockingQueue<TicketBookedEvent> deadLetterQueue = new LinkedBlockingQueue<>();
    private final BlockingQueue<PaymentEvent> paymentQueue = new LinkedBlockingQueue<>();

    public void publish(TicketBookedEvent event) {
        inventoryQueue.offer(event);
        notificationQueue.offer(event);
    }

    public BlockingQueue<TicketBookedEvent> inventoryQueue() {
        return inventoryQueue;
    }

    public BlockingQueue<TicketBookedEvent> notificationQueue() {
        return notificationQueue;
    }

    public BlockingQueue<TicketBookedEvent> deadLetterQueue() {
        return deadLetterQueue;
    }

    public void publishPayment(PaymentEvent event) {
        paymentQueue.offer(event);
    }

    public BlockingQueue<PaymentEvent> paymentQueue() {
        return paymentQueue;
    }
}
