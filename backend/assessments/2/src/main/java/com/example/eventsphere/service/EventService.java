package com.example.eventsphere.service;

import com.example.eventsphere.model.Event;
import com.example.eventsphere.repository.EventRepository;
import com.example.eventsphere.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent (String name, Integer tickets){
        Event event = new Event();
        event.setName(name);
        event.setTickets(tickets);
        return eventRepository.save(event);
    }

    public Event patchEvent(UUID id, String name, Integer tickets) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        event.setName(name);
        event.setTickets(tickets);
        return event;
    }

    public Page<Event> getEvents (Pageable pageable) {
        return eventRepository.findAll(pageable);
    }
}
