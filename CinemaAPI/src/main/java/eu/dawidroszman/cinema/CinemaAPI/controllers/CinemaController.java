package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import eu.dawidroszman.cinema.CinemaAPI.services.ScreeningService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cinema")
public class CinemaController {

    private final MovieService movieService;
    private final ScreeningService screeningService;

    public CinemaController(MovieService movieService, ScreeningService screeningService) {
        this.movieService = movieService;
        this.screeningService = screeningService;
    }

    @GetMapping("")
    public String index() {
        return "Cinema API";
    }

    @GetMapping("/movies")
    public List<MovieEntity> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/movies/{title}")
    public MovieEntity getMovieByTitle(@PathVariable String title) {
        return movieService.getMovieByTitle(title);
    }

    @GetMapping("/movies/search")
    public List<MovieEntity> searchMoviesByTitle(@RequestParam(name = "title") String title) {
        return movieService.searchMoviesByTitle(title);
    }

    @GetMapping("/screenings")
    public List<ScreeningEntity> getAllScreenings() {
        return screeningService.getAllScreenings();
    }

    @GetMapping("/screenings/{id}")
    public ScreeningEntity getScreeningById(@PathVariable UUID id) {
        return screeningService.getScreeningById(id);
    }

    @GetMapping("/screenings/search")
    public UUID getScreeningIdByDateTimeAuditoriumAndMovie(@RequestParam(required = false) String date,
                                                           @RequestParam(name = "auditorium", required = false) Integer auditoriumNumber,
                                                           @RequestParam(required = false) String time,
                                                           @RequestParam(required = false) String title) {
        return screeningService.getScreeningIdByDateTimeAuditoriumAndMovie(date, auditoriumNumber, time, title);
    }

}
