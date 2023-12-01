package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.TicketRepository;

@Service
public class TicketService {

    ScreeningService screeningService;
    UserService userService;
    SeatService seatService;
    TicketRepository ticketRepository;

    public TicketService(ScreeningService screeningService, UserService userService, SeatService seatService, TicketRepository ticketRepository) {
        this.screeningService = screeningService;
        this.userService = userService;
        this.seatService = seatService;
        this.ticketRepository = ticketRepository;
    }

    public void buyTicket(String username, UUID screeningId, UUID seatId) {

        var ticket = TicketEntity.builder()
                .screening(screeningService.getScreeningById(screeningId))
                .user(userService.getUserByUsername(username))
                .seat(seatService.getSeatById(seatId))
                .build();
        ticketRepository.save(ticket);
    }

    public List<TicketEntity> getTicketsByUsername(String name){
        return ticketRepository.findAllByUser(name);
    }

}
