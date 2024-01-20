package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.PersonEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface PersonRepository extends Neo4jRepository<PersonEntity, String> {

    void deleteByName(String name);

    @Query("MATCH (p:Person {name: $name}) " +
            "SET p.born = $born")
    void modifyPerson(String name, Integer born);

    @Query("MATCH (p:Person {name: $personName}), (m:Movie {title: $movieTitle}) " +
            "CREATE (p)-[:ACTED_IN]->(m)")
    void addMovieToPerson(String personName, String movieTitle);

    @Query("MATCH (p:Person {name: $personName})-[r:ACTED_IN]->(m:Movie {title: $movieTitle}) " +
            "DELETE r")
    void removeMovieFromPerson(String personName, String movieTitle);

    @Query("MATCH (p:Person {name: $personName}) " +
            "CALL apoc.path.subgraphAll(p, {relationshipFilter:'ACTED_IN', labelFilter:'>Movie'}) YIELD nodes " +
            "UNWIND nodes as n " +
            "RETURN n.title as title")
    List<String> findAllMoviesWithPerson(String personName);
}
