package eu.dawidroszman.cinema.CinemaAPI.objects;

import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public record TicketDTO(UUID id, List<SeatEntity> seats, Integer auditoriumNumber, String movieTitle,
                        ZonedDateTime screeningDate, Double price) {

    public static List<TicketDTO> from(List<TicketEntity> tickets) {
        return tickets.stream().map(ticket -> new TicketDTO(ticket.getId(),ticket.getSeats(),
                ticket.getScreening().getAuditorium().getNumber(),
                ticket.getScreening().getMovie().getTitle(), ticket.getScreening().getDate(), ticket.getPrice())).toList();
    }
}
