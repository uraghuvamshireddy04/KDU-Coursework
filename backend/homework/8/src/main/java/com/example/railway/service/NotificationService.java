package com.example.railway.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import com.example.railway.model.TicketBookedEvent;
import com.example.railway.model.InMemoryEventBus;

@Component
public class NotificationService {

    private final InMemoryEventBus eventBus;

    public NotificationService(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    @PostConstruct
    public void start() {
        new Thread(() -> {
            while (true) {
                try {
                    TicketBookedEvent event = eventBus.notificationQueue().take();
                    process(event);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }
    private void process(TicketBookedEvent event) throws InterruptedException {
        try{
            if(event.getAge() < 0) {
                throw new RuntimeException("Invalid age: " + event.getAge());
            }
            System.out.println("Notification Service : Seat " + event.getPhoneNumber());

        }catch(Exception ex){
            event.incrementRetry();
            if(event.getRetryCount() <= 3){
                System.out.println("Notification Retry "+ event.getRetryCount());
                Thread.sleep(1000);
                eventBus.inventoryQueue().offer(event);
            }else {
                System.out.println("Notification Failed. Sending to DLQ" + event.getBookingId());
                eventBus.deadLetterQueue().offer(event);
            }
        }
    }
}
