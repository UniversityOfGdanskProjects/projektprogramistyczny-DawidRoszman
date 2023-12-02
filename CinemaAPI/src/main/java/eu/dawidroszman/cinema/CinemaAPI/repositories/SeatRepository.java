package eu.dawidroszman.cinema.CinemaAPI.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;

public interface SeatRepository extends Neo4jRepository<SeatEntity, UUID> {

    @Query("MATCH (s:Seat {id: $seatId}) RETURN s")
    Optional<SeatEntity> findById(UUID seatId);

}
