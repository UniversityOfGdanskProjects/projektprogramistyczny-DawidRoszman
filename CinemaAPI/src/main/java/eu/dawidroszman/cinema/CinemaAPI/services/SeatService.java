package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.SeatRepository;

import static eu.dawidroszman.cinema.CinemaAPI.enums.Price.getPrice;

@Service
public class SeatService {
    SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    SeatEntity getSeatById(UUID id) {
        return seatRepository.findById(id).orElseThrow();
    }

    public Double getSeatPrice(UUID seatId, String discount) {
        SeatEntity seat = seatRepository.findById(seatId).orElseThrow();
        Boolean isVip = seat.getVip();
        return getPrice(discount, isVip);
    }
}
