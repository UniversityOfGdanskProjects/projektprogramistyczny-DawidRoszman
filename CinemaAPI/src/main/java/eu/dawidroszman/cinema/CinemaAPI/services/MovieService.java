package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.PersonEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.MovieRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
  private final MovieRepository movieRepository;

  public MovieService(MovieRepository movieRepository) {
    this.movieRepository = movieRepository;
  }

  public List<MovieEntity> getAllMovies() {
    return movieRepository.findAllMovies();
  }

  public MovieEntity getMovieByTitle(String title) {
    return movieRepository.findByTitle(title).orElseThrow();
  }

  public List<MovieEntity> searchMoviesByTitle(String title) {
    return movieRepository.findByTitleContaining(title);
  }

  public boolean addMovie(MovieEntity movie) {
    Optional<MovieEntity> movieOptional = movieRepository.findByTitle(movie.getTitle());
    if (movieOptional.isPresent()) {
        return false;
    }
    movieRepository.save(movie);
    return true;
  }
  public void deleteMovie(String movieTitle) {
    MovieEntity movie = movieRepository.findByTitle(movieTitle)
        .orElseThrow(() -> new RuntimeException("Movie not found"));
    movieRepository.delete(movie);
  }

  public void updateMovie(MovieEntity movie) {
    String title = movie.getTitle();
    String description = movie.getDescription();
    Integer released = movie.getReleased();
    String imageUrl = movie.getImageUrl();
    String trailer = movie.getTrailer();
    movieRepository.modifyMovie(title, description, released, imageUrl, trailer);
  }

  public List<PersonEntity> getActorsFromMovie(String title) {
    return movieRepository.findActorsFromMovie(title);
  }

  public PersonEntity addActorToMovie(String movieTitle, String actorName) {
    return movieRepository.addActorToMovie(movieTitle, actorName);
  }
}
