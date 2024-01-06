package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends Neo4jRepository<MovieEntity, String> {
    @Query("MATCH (m:Movie) RETURN m")
    List<MovieEntity> findAllMovies();

    Optional<MovieEntity> findByTitle(String title);

    @Query("MATCH (m:Movie) WHERE m.title CONTAINS $title RETURN m")
    List<MovieEntity> findByTitleContaining(String title);

    @Query("MATCH (m:Movie) WHERE m.title = $title SET m = $movie")
    void modifyMovie(MovieEntity movie);
}
