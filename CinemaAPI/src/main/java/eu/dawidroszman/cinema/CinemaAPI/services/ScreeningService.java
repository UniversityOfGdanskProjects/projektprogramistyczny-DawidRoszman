package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.ScreeningRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public UUID getScreeningIdByDateTimeAuditoriumAndMovie(String date, Integer auditoriumNumber, String time, String title) {
        MovieEntity movie = movieService.getMovieByTitle(title);
        AuditoriumEntity auditorium = auditoriumService.getAuditoriumByNumber(auditoriumNumber);
        return screeningRepository.findByDateAndTimeAndAuditoriumAndMovie(date, time, auditorium, movie).getId();
    }

    public ScreeningEntity getScreeningById(UUID id) {
        return screeningRepository.findById(id).orElseThrow();
    }

}
