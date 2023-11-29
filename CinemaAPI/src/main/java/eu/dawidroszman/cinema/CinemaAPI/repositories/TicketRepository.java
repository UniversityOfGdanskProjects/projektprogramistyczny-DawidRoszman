package eu.dawidroszman.cinema.CinemaAPI.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

public interface TicketRepository extends Neo4jRepository<TicketEntity, UUID> {

    @Query("MATCH (t:Ticket) RETURN t")
    List<TicketEntity> findAllTickets();

    @Query("""
            MATCH (t:Ticket)-[o:OWNED_BY]->(u:User)
            WHERE u.username = $username
            RETURN t
            """)
    List<TicketEntity> findAllTicketsByUsername(String username);

    Optional<TicketEntity> findById(UUID ticketId);

}
