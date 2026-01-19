package com.example.eventsphere.controller;

import com.example.eventsphere.dto.EventDTO;
import com.example.eventsphere.model.Event;
import com.example.eventsphere.service.EventService;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Event create(@Valid @RequestBody EventDTO eventdto) {
        return eventService.createEvent(eventdto.getName(), eventdto.getTickets());
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Event patch(@Valid @RequestBody EventDTO event, @PathVariable UUID id) {
        return eventService.patchEvent(id, event.getName(), event.getTickets());
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Page<Event>> getAllEvents(@ParameterObject Pageable pageable) {
        Page<Event> response = eventService.getEvents(pageable);
        return ResponseEntity.ok(response);
    }


}
