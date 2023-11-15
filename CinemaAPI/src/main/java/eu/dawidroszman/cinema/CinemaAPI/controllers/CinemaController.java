package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cinema")
public class CinemaController {

    private final MovieService movieService;

    public CinemaController(MovieService movieService) {
        this.movieService = movieService;
    }
    @GetMapping("")
    public String index() {
        return "Cinema API";
    }

    @GetMapping("/movies")
    public List<MovieEntity> getAllMovies() {
        return movieService.getAllMovies();
    }
}
