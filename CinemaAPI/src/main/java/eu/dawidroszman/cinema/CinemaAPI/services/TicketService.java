package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.TicketRepository;

@Service
public class TicketService {

    ScreeningService screeningService;
    UserService userService;
    SeatService seatService;
    TicketRepository ticketRepository;

    public TicketService(ScreeningService screeningService, UserService userService, SeatService seatService) {
        this.screeningService = screeningService;
        this.userService = userService;
        this.seatService = seatService;
    }

    public void buyTicket(String username, UUID screeningId, UUID seatId) {

        TicketEntity ticket = TicketEntity.builder()
                .screening(screeningService.getScreeningById(screeningId))
                .user(userService.getUserByUsername(username))
                .seat(seatService.getSeatById(seatId))
                .build();
        ticketRepository.save(ticket);
    }
}
