package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    private final MovieService movieService;
    private final UserService userService;

    public AdminController(MovieService movieService, UserService userService) {
        this.movieService = movieService;
        this.userService = userService;
    }

    @GetMapping()
    public String index(Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        return "Welcome to admin API";
    }
    @PostMapping("/add-movie")
    public void addMovie(@RequestBody MovieEntity movie, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        movieService.addMovie(movie);
    }

    @DeleteMapping("/delete-movie/{title}")
    public void deleteMovie(@PathVariable String title, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        System.out.println(title);
        movieService.deleteMovie(title);
    }

    @PutMapping("/update-movie")
    public void updateMovie(@RequestBody MovieEntity movie, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        movieService.updateMovie(movie);
    }

}
