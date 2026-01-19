package com.example.eventsphere.service;

import com.example.eventsphere.model.Event;
import com.example.eventsphere.model.Reservation;
import com.example.eventsphere.model.ReservationStatus;
import com.example.eventsphere.model.User;
import com.example.eventsphere.repository.EventRepository;
import com.example.eventsphere.repository.ReservationRepository;
import com.example.eventsphere.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
public class ReservationService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public ReservationService(EventRepository eventRepository, UserRepository userRepository, ReservationRepository reservationRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public void createReservation(String userName, String eventName) {
        Event event = eventRepository.findByname(eventName)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Integer ticketsAvailable = event.getTickets();
        if(ticketsAvailable <= 0){
            throw new IllegalArgumentException("Tickets not available");
        }
        event.setTickets(ticketsAvailable - 1);
        eventRepository.save(event);
        Reservation reservation = new Reservation();
        reservation.setStatus(ReservationStatus.PROCESSING);
        reservation.setEvent(event);
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.BOOKED);
        reservationRepository.save(reservation);

    }

    @Transactional
    public void cancelReservation (UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        Integer tickets = reservation.getEvent().getTickets();
        reservation.getEvent().setTickets(tickets+1);
        eventRepository.save(reservation.getEvent());
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }
}
