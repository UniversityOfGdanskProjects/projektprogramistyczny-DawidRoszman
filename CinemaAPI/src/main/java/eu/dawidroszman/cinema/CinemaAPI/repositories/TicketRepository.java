package eu.dawidroszman.cinema.CinemaAPI.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

public interface TicketRepository extends Neo4jRepository<TicketEntity, UUID> {

    @Query("MATCH (t:Ticket) RETURN t")
    List<TicketEntity> findAllTickets();


    @Query("MATCH (t:Ticket)-[r:OWNED_BY]->(u:User) WHERE u.username = $username\n" +
            "MATCH (t)-[f:FOR]->(s:Screening)-[plays:PLAYS]->(m:Movie)\n" +
            "MATCH (t)-[f]->(s)-[isin:IS_IN]->(a:Auditorium)\n" +
            "MATCH (t)-[seat:SEAT]->(seatNode:Seat)\n" +
            "RETURN t,r,u,f,s,seat,seatNode, m, a, plays, isin")
    List<TicketEntity> findAllByUser(String username);

    Optional<TicketEntity> findById(UUID ticketId);

}
