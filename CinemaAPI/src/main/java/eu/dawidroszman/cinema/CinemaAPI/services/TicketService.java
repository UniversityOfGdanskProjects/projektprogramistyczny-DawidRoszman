package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import eu.dawidroszman.cinema.CinemaAPI.enums.Price;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.objects.Order;
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

    public UUID buyTicket(String username, UUID screeningId, List<Order> orders) {

        List<SeatEntity> seats = orders.stream().map(Order::id).map(seatService::getSeatById).toList();
        Double totalPrice = orders.stream().reduce(0.0, (subtotal, order) -> subtotal + seatService.getSeatPrice(order.id(), order.discount()), Double::sum);
        List<UUID> seatsIds = seats.stream().map(SeatEntity::getId).toList();

        System.out.println("Total price: " + totalPrice);
        System.out.println("Seats: " + seatsIds);
        System.out.println("Screening: " + screeningId);

        UUID uuid = ticketRepository.buyTicket(totalPrice, username, screeningId, seatsIds).getFirst();
        return ticketRepository.getTicketById(uuid);
    }

    public List<TicketEntity> getTicketsByUsername(String name){
        return ticketRepository.findAllByUser(name);
    }

}
