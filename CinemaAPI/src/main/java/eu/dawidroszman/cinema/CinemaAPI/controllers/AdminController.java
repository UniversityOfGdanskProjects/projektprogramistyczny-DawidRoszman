package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> addMovie(@RequestBody MovieEntity movie, Principal principal) {
    if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
        return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
    }
    boolean didAdd = movieService.addMovie(movie);
    if (!didAdd) {
        return new ResponseEntity<>("Movie already exists!", HttpStatus.CONFLICT);
    }
    return new ResponseEntity<>("Movie added successfully", HttpStatus.CREATED);
}

    @DeleteMapping("/delete-movie/{title}")
    public ResponseEntity<String> deleteMovie(@PathVariable String title, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
        }
        movieService.deleteMovie(title);
        return new ResponseEntity<>("Movie deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/update-movie")
    public ResponseEntity<String> updateMovie(@RequestBody MovieEntity movie, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
        }
        movieService.updateMovie(movie);
        return new ResponseEntity<>("Movie updated successfully", HttpStatus.OK);
    }

}
