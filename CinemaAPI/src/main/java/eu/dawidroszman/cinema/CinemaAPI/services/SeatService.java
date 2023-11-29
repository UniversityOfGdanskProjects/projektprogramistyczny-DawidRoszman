package eu.dawidroszman.cinema.CinemaAPI.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.SeatRepository;

@Service
public class SeatService {
    SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    SeatEntity getSeatById(UUID id) {
        return seatRepository.findById(id).orElseThrow();
    }
}
