package eu.dawidroszman.cinema.CinemaAPI.requests;

import lombok.Data;

import java.util.UUID;

@Data
public class TicketRequest {
    private UUID screeningId;
    private UUID seatId;
}
