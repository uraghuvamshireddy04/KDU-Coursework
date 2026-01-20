package com.example.railway.controller;

import com.example.railway.dto.BookTicketRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.railway.service.TicketBookService;

@RestController
@RequestMapping("/bookTicket")
public class TicketBookController {
    private final TicketBookService ticketBookService;

    public TicketBookController(TicketBookService ticketBookService){

        this.ticketBookService = ticketBookService;
    }
    
    @PostMapping
    public ResponseEntity<String> bookTicket(@Valid @RequestBody BookTicketRequestDto request){
        return ResponseEntity.ok(ticketBookService.bookTicket(request));
    }
}
