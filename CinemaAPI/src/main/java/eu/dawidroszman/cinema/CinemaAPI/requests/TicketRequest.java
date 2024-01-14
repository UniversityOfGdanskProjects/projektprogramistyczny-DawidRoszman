package eu.dawidroszman.cinema.CinemaAPI.requests;

import eu.dawidroszman.cinema.CinemaAPI.enums.Price;
import lombok.Data;

import java.util.UUID;

@Data
public class TicketRequest {
    private UUID screeningId;
    private UUID seatId;
    private String discount = "NORMAL";
}
