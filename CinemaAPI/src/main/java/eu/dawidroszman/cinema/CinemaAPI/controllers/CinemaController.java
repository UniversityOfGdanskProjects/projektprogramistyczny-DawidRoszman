package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.AuditoriumService;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import eu.dawidroszman.cinema.CinemaAPI.services.ScreeningService;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cinema")
public class CinemaController {

    private final MovieService movieService;
    private final ScreeningService screeningService;
    private final AuditoriumService auditoriumService;

    public CinemaController(MovieService movieService, ScreeningService screeningService, AuditoriumService auditoriumService) {
        this.movieService = movieService;
        this.screeningService = screeningService;
        this.auditoriumService = auditoriumService;
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

    @GetMapping("/screenings/{screeningId}/seat/{seatId}")
    public boolean checkIfSeatIsTaken(@PathVariable UUID screeningId, @PathVariable UUID seatId) {
        return screeningService.checkIfSeatIsTaken(screeningId, seatId);
    }

    @GetMapping("/screenings/{screeningId}/seatsTaken")
    public List<UUID> getSeatsTaken(@PathVariable UUID screeningId) {
        return screeningService.getSeatsTaken(screeningId);
    }

    @GetMapping("/screenings/search")
    public UUID getScreeningIdByDateAuditoriumAndMovie(@RequestParam(required = false) ZonedDateTime date,
                                                           @RequestParam(name = "auditorium", required = false) Integer auditoriumNumber,
                                                           @RequestParam(required = false) String title) {
        return screeningService.getScreeningIdByDateAuditoriumAndMovie(date, auditoriumNumber, title);
    }

    @GetMapping("/auditoriums")
    public List<AuditoriumEntity> getAllAuditoriums() {
        return auditoriumService.getAllAuditoriums();
    }

}
