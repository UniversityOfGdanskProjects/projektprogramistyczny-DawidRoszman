package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;
import eu.dawidroszman.cinema.CinemaAPI.requests.TicketRequest;
import eu.dawidroszman.cinema.CinemaAPI.services.TicketService;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v1/tickets")
public class TicketsController {

    TicketService ticketService;

    public TicketsController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/get")
    public List<TicketEntity> getTickets(Principal principal) {
        return ticketService.getTicketsByUsername(principal.getName());
    }

    @PostMapping("/buy")
    public void buyTicket(Principal principal, @RequestBody TicketRequest ticketRequest) {
        ticketService.buyTicket(principal.getName(), ticketRequest.getScreeningId(), ticketRequest.getSeatId());
    }
}
