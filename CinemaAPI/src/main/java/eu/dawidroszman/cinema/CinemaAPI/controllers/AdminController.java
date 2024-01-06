package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    private final MovieService movieService;

    public AdminController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping()
    public String index() {
        return "Welcome to admin API";
    }
    @PostMapping("/add-movie")
    public void addMovie(@RequestBody MovieEntity movie) {
        movieService.addMovie(movie);
    }

    @PostMapping("/delete-movie")
    public void deleteMovie(@RequestBody MovieEntity movie) {
        movieService.deleteMovie(movie);
    }

    @PutMapping("/update-movie")
    public void updateMovie(@RequestBody MovieEntity movie) {
        movieService.updateMovie(movie);
    }

}
