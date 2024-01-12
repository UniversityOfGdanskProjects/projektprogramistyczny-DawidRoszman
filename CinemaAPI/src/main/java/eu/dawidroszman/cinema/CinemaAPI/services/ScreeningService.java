package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.ScreeningRepository;
import org.springframework.stereotype.Service;

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

    public UUID getScreeningIdByDateTimeAuditoriumAndMovie(String date, Integer auditoriumNumber, String time, String title) {
        MovieEntity movie = movieService.getMovieByTitle(title);
        AuditoriumEntity auditorium = auditoriumService.getAuditoriumByNumber(auditoriumNumber);
        return screeningRepository.findByDateAndTimeAndAuditoriumAndMovie(date, time, auditorium, movie).getId();
    }

    public boolean checkIfScreeningOnDataAndTimeInAuditoriumExists(String date, String time, AuditoriumEntity auditorium) {
        return screeningRepository.findByDateAndTimeAndAuditorium(date, time, auditorium).isPresent();
    }

    public ScreeningEntity getScreeningById(UUID id) {
        return screeningRepository.findById(id).orElseThrow();
    }

    public boolean addScreening(ScreeningEntity screening) {
        if (checkIfScreeningOnDataAndTimeInAuditoriumExists(screening.getDate(), screening.getTime(), screening.getAuditorium())) {
            return false;
        }
        screeningRepository.save(screening);
        return true;
    }

    public void deleteScreening(UUID screeningId) {
        ScreeningEntity screening = screeningRepository.findById(screeningId).orElseThrow();
        screeningRepository.delete(screening);
    }

    public void updateScreening(ScreeningEntity screening) {
        UUID id = screening.getId();
        String date = screening.getDate();
        String time = screening.getTime();
        Integer auditoriumNumber = screening.getAuditorium().getNumber();
        String title = screening.getMovie().getTitle();
        screeningRepository.modifyScreening(id, date, time, auditoriumNumber, title);
    }
}
