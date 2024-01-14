package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.requests.CreateScreeningRequest;
import eu.dawidroszman.cinema.CinemaAPI.requests.UpdateScreeningRequest;
import eu.dawidroszman.cinema.CinemaAPI.services.MovieService;
import eu.dawidroszman.cinema.CinemaAPI.services.ScreeningService;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    private final MovieService movieService;
    private final ScreeningService screeningSerive;
    private final UserService userService;


    public AdminController(MovieService movieService, ScreeningService screeningSerive, UserService userService) {
        this.movieService = movieService;
        this.screeningSerive = screeningSerive;
        this.userService = userService;
    }

    @GetMapping()
    public String index(Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        return "Welcome to admin API";
    }

    @PostMapping("/movie/add")
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

    @PostMapping("/screening/add")
    public ResponseEntity<ScreeningEntity> addScreening(@RequestBody CreateScreeningRequest screeningRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ZonedDateTime formattedDate = ZonedDateTime.parse(screeningRequest.getDate(), DateTimeFormatter.ISO_DATE_TIME);
        ScreeningEntity screening = screeningSerive.addScreening(formattedDate, screeningRequest.getMovieTitle(), screeningRequest.getAuditoriumNumber());
        if (screening == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(screening, HttpStatus.CREATED);
    }

    @DeleteMapping("/movie/delete/{title}")
    public ResponseEntity<String> deleteMovie(@PathVariable String title, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
        }
        movieService.deleteMovie(title);
        return new ResponseEntity<>("Movie deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/screening/delete/{id}")
    public ResponseEntity<String> deleteScreening(@PathVariable UUID id, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
        }
        screeningSerive.deleteScreening(id);
        return new ResponseEntity<>("Screening deleted successfully", HttpStatus.OK);
    }


    @PutMapping("/movie/update")
    public ResponseEntity<String> updateMovie(@RequestBody MovieEntity movie, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>("You are not an admin!", HttpStatus.FORBIDDEN);
        }
        movieService.updateMovie(movie);
        return new ResponseEntity<>("Movie updated successfully", HttpStatus.OK);
    }

    @PutMapping("/screening/update")
    public ResponseEntity<ScreeningEntity> updateScreening(@RequestBody UpdateScreeningRequest screeningRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ZonedDateTime date = ZonedDateTime.parse(screeningRequest.getDate(), DateTimeFormatter.ISO_DATE_TIME);
        ScreeningEntity screening = screeningSerive.updateScreening(screeningRequest.getId(), date, screeningRequest.getAuditoriumNumber(), screeningRequest.getMovieTitle());
        return new ResponseEntity<>(screening, HttpStatus.OK);
    }

}
