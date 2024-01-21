package eu.dawidroszman.cinema.CinemaAPI.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import eu.dawidroszman.cinema.CinemaAPI.enums.Price;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.objects.Order;
import eu.dawidroszman.cinema.CinemaAPI.objects.TicketSalesReportObject;
import org.neo4j.driver.Result;
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

    public List<TicketEntity> getTicketsByUsername(String name) {
        return ticketRepository.findAllByUser(name);
    }


    public TicketSalesReportObject getTicketReportByDate(String date) {
        return ticketRepository.countAndSumTicketsForDate(date);
    }

    public TicketSalesReportObject getTicketReportByMonth(String date) {
        return ticketRepository.countAndSumTicketsForMonth(date);
    }

    public List<TicketSalesReportObject> getTicketReportByDateRange(String startDate, String endDate) {
        return ticketRepository.countAndSumTicketsForDateRange(startDate, endDate);
    }

    public List<SeatEntity> getSeatByTicketId(UUID id) {
        return ticketRepository.getSeatByTicketId(id);
    }

    public Double getTotalRevenueForMovie(String movieTitle) {
        return ticketRepository.getTotalRevenueForMovie(movieTitle);
    }


}
