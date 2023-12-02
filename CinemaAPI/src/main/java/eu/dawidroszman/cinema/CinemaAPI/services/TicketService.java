package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.List;
import java.util.UUID;

import eu.dawidroszman.cinema.CinemaAPI.enums.Price;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
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

    public void buyTicket(String username, UUID screeningId, UUID seatId, String discount) {

        ScreeningEntity screening = screeningService.getScreeningById(screeningId);
        UserEntity user = userService.getUserByUsername(username);
        SeatEntity seat = seatService.getSeatById(seatId);
        Double price = Price.getPrice(discount, seat.getVip());

        var ticket = TicketEntity.builder()
                .screening(screening)
                .user(user)
                .seat(seat)
                .price(price)
                .build();
        ticketRepository.save(ticket);
    }

    public List<TicketEntity> getTicketsByUsername(String name){
        return ticketRepository.findAllByUser(name);
    }

}
