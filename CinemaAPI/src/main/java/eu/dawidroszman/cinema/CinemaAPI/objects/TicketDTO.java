package eu.dawidroszman.cinema.CinemaAPI.objects;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public record TicketDTO(UUID id, Integer row, Integer column, Boolean vip, Integer auditoriumNumber, String movieTitle,
                        ZonedDateTime screeningDate, Double price) {

    public static List<TicketDTO> from(List<TicketEntity> tickets) {
        return tickets.stream().map(ticket -> new TicketDTO(ticket.getId(),ticket.getSeat().getRow(), ticket.getSeat().getColumn(),
                ticket.getSeat().getVip(), ticket.getScreening().getAuditorium().getNumber(),
                ticket.getScreening().getMovie().getTitle(), ticket.getScreening().getDate(), ticket.getPrice())).toList();
    }
}
