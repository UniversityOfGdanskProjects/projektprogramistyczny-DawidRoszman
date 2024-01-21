package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.ScreeningRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final MovieService movieService;
    private final AuditoriumService auditoriumService;

    ScreeningService(ScreeningRepository screeningRepository, MovieService movieService, AuditoriumService auditoriumService) {
        this.screeningRepository = screeningRepository;
        this.movieService = movieService;
        this.auditoriumService = auditoriumService;
    }

    public List<ScreeningEntity> getAllScreenings() {
        return screeningRepository.findAll();
    }

    public UUID getScreeningIdByDateAuditoriumAndMovie(ZonedDateTime date, Integer auditoriumNumber, String title) {
        Optional<ScreeningEntity> screening =  screeningRepository.findByDateAndAuditoriumAndMovie(date, auditoriumNumber, title);
        return screening.map(ScreeningEntity::getId).orElse(null);
    }

    public boolean checkIfScreeningOnDateInAuditoriumExists(ZonedDateTime date, Integer auditoriumNumber) {
        return screeningRepository.findByDateAndAuditorium(date, auditoriumNumber).isEmpty();
    }

    public ScreeningEntity getScreeningById(UUID id) {
        return screeningRepository.findById(id).orElseThrow();
    }

    public ScreeningEntity addScreening(ZonedDateTime date, String movieTitle, Integer auditoriumNumber) {
        if (!checkIfScreeningOnDateInAuditoriumExists(date, auditoriumNumber)) {
            return null;
        }
        screeningRepository.createScreening(UUID.randomUUID(), date, auditoriumNumber, movieTitle);
        return screeningRepository.findByDateAndAuditoriumAndMovie(date, auditoriumNumber, movieTitle).orElseThrow();
    }

    public void deleteScreening(UUID screeningId) {
        ScreeningEntity screening = screeningRepository.findById(screeningId).orElseThrow();
        screeningRepository.delete(screening);
    }

    public ScreeningEntity updateScreening(UUID id, ZonedDateTime date, Integer auditoriumNumber, String title) {
        screeningRepository.deleteById(id);
        screeningRepository.createScreening(id, date, auditoriumNumber, title);
        return screeningRepository.findById(id).orElseThrow();
    }

    public boolean checkIfSeatIsTaken(UUID screeningId, UUID seatId) {
        return screeningRepository.isSeatTaken(screeningId, seatId);
    }

    public List<UUID> getSeatsTaken(UUID screeningId) {
        return screeningRepository.getSeatsTaken(screeningId);
    }
    public String mostPopularMovie() {
        return screeningRepository.mostPopularMovie();
    }
}
