package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.UUID;

public interface AuditoriumRepository extends Neo4jRepository<AuditoriumEntity, Integer> {
    AuditoriumEntity findByNumber(Integer number);

}
