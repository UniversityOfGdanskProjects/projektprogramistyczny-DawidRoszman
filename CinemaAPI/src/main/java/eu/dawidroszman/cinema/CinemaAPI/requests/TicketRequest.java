package eu.dawidroszman.cinema.CinemaAPI.requests;

import eu.dawidroszman.cinema.CinemaAPI.enums.Price;
import eu.dawidroszman.cinema.CinemaAPI.objects.Order;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class TicketRequest {
    private UUID screeningId;
    private List<Order> orders;
}
