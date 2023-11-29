package eu.dawidroszman.cinema.CinemaAPI.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("api/v1/tickets")
public class TicketsController {

    @GetMapping("/get")
    public String getTickets(Principal principal) {
        return "Tickets for " + principal.getName() + " are: ";
    }
}
