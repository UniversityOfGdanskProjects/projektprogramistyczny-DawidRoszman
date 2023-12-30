package eu.dawidroszman.cinema.CinemaAPI.objects;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

import java.util.List;

public record TicketDTO(Integer row, Integer column, Boolean vip, Integer auditoriumNumber, String movieTitle,
                        String screeningDate, String screeningTime, Double price) {

    public static List<TicketDTO> from(List<TicketEntity> tickets) {
        return tickets.stream().map(ticket -> new TicketDTO(ticket.getSeat().getRow(), ticket.getSeat().getColumn(),
                ticket.getSeat().getVip(), ticket.getScreening().getAuditorium().getNumber(),
                ticket.getScreening().getMovie().getTitle(), ticket.getScreening().getDate(),
                ticket.getScreening().getTime(), ticket.getPrice())).toList();
    }
}