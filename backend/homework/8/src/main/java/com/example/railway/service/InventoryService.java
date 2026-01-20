package com.example.railway.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import com.example.railway.model.TicketBookedEvent;
import com.example.railway.model.InMemoryEventBus;

@Component
public class InventoryService {

    private final InMemoryEventBus eventBus;
    public InventoryService(InMemoryEventBus eventBus) {
        this.eventBus = eventBus;
    }

    @PostConstruct
    public void start() {
        new Thread(() -> {
            while (true) {
                try {
                    TicketBookedEvent event = eventBus.inventoryQueue().take();
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
            System.out.println("Inventory Service : Seat " + event.getSeatNumber());

        }catch(Exception ex){
            event.incrementRetry();
            if(event.getRetryCount() <= 3){
                System.out.println("Inventory Retry "+ event.getRetryCount());
                Thread.sleep(1000);
                eventBus.inventoryQueue().offer(event);
            }else {
                System.out.println("Inventory Failed. Sending to DLQ" + event.getBookingId());
                eventBus.deadLetterQueue().offer(event);
            }
        }
    }
}
