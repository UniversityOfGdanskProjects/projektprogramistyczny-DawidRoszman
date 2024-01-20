package eu.dawidroszman.cinema.CinemaAPI.requests;

import lombok.Data;


public record PersonMovieRequest(String personName, String movieTitle) {
}
