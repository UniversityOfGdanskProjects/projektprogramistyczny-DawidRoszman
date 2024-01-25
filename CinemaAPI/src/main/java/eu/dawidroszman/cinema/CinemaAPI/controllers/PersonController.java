package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.PersonEntity;
import eu.dawidroszman.cinema.CinemaAPI.requests.PersonMovieRequest;
import eu.dawidroszman.cinema.CinemaAPI.requests.PersonRequest;
import eu.dawidroszman.cinema.CinemaAPI.services.PersonService;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/persons")
public class PersonController {

    private final PersonService personService;
    private final UserService userService;

    public PersonController(PersonService personService, UserService userService) {
        this.personService = personService;
        this.userService = userService;
    }

    @GetMapping("/all")
    List<PersonEntity> findAll(){
        return personService.findAll();
    }
    @GetMapping("/all/{personName}")
    List<String> findAllMoviesWithPerson(@PathVariable String personName) {
        return personService.findAllMoviesWithPerson(personName);
    }

    @PostMapping("/create")
    void createPerson(@RequestBody PersonRequest personRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        personService.createPerson(personRequest.name(), personRequest.born());
    }

    @DeleteMapping("/delete/{personName}")
    void deletePerson(@PathVariable String personName, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        personService.deletePerson(personName);
    }

    @PutMapping("/modify")
    void modifyPerson(@RequestBody PersonRequest personRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        personService.modifyPerson(personRequest.name(), personRequest.born());
    }

    @PutMapping("/addMovie")
    void addMovieToPerson(@RequestBody PersonMovieRequest personMovieRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        personService.addMovieToPerson(personMovieRequest.personName(), personMovieRequest.movieTitle());
    }

    @PutMapping("/removeMovie")
    void removeMovieFromPerson(@RequestBody PersonMovieRequest personMovieRequest, Principal principal) {
        if (!userService.getUserByUsername(principal.getName()).isAdmin()) {
            throw new RuntimeException("You are not an admin!");
        }
        personService.removeMovieFromPerson(personMovieRequest.personName(), personMovieRequest.movieTitle());
    }
}
