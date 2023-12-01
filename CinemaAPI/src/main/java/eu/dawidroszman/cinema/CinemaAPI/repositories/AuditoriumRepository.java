package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface AuditoriumRepository extends Neo4jRepository<AuditoriumEntity, Integer> {
    AuditoriumEntity findByNumber(Integer number);

}
