package eu.dawidroszman.cinema.CinemaAPI.objects;


public record TicketSalesReportObject(
        Long ticketCount,
        Double totalSum,
        String date
) {
}
