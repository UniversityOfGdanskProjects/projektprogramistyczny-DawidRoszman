package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.PersonEntity;
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

    @Query("MATCH (m:Movie) WHERE m.title = $title SET m.description = $description, m.released = $released, m.imageUrl = $imageUrl, m.trailer = $trailer RETURN m")
    void modifyMovie(String title, String description, Integer released, String imageUrl, String trailer);

    @Query("""
            MATCH (m:Movie {title : $title})<-[:ACTED_IN]-(a:Person) RETURN a.name AS name, a.born AS born
            """)
    List<PersonEntity> findActorsFromMovie(String title);

    @Query("""
MATCH (m:Movie {title: $movieTitle}), (a:Person {name: $actorName})
            CREATE (a)-[:ACTED_IN]->(m) RETURN a.name AS name, a.born AS born
            """)
    PersonEntity addActorToMovie(String movieTitle, String actorName);
}

