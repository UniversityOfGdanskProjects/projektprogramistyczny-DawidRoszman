package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public void addMovie(MovieEntity movie) {
        movieRepository.save(movie);
    }

    public void deleteMovie(MovieEntity movie) {
        movieRepository.delete(movie);
    }

    public void updateMovie(MovieEntity movie) {
        movieRepository.modifyMovie(movie);
    }
}
