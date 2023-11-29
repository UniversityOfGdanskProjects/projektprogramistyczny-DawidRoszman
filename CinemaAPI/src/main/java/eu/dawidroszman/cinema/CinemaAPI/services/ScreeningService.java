package eu.dawidroszman.cinema.CinemaAPI.services;

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

    ScreeningService(ScreeningRepository screeningRepository, MovieService movieService) {
        this.screeningRepository = screeningRepository;
        this.movieService = movieService;
    }

    public List<ScreeningEntity> getAllScreenings() {
        return screeningRepository.findAll();
    }

    public ScreeningEntity getScreeningByDateAndTimeAndMovie(String date, String time, String title) {
        MovieEntity movie = movieService.getMovieByTitle(title);
        return screeningRepository.findByDateAndTimeAndMovie(date, time, movie);
    }

    ScreeningEntity getScreeningById(UUID id) {
        return screeningRepository.findById(id).orElseThrow();
    }

}
