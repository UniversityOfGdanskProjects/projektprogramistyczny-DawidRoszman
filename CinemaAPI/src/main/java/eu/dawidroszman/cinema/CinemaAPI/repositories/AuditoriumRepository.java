package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface AuditoriumRepository extends Neo4jRepository<AuditoriumEntity, Integer> {
    @Query("MATCH (a:Auditorium {number: $number}) RETURN a")
    AuditoriumEntity findByNumber(Integer number);

}
