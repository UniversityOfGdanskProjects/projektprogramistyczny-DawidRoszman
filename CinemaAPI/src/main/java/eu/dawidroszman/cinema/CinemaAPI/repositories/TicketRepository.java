package eu.dawidroszman.cinema.CinemaAPI.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import eu.dawidroszman.cinema.CinemaAPI.models.TicketEntity;

public interface TicketRepository extends Neo4jRepository<TicketEntity, UUID> {

    @Query("MATCH (t:Ticket) RETURN t")
    List<TicketEntity> findAllTickets();


    @Query("""
            MATCH (t:Ticket)-[r:OWNED_BY]->(u:User) WHERE u.username = $username
            MATCH (t)-[f:FOR]->(s:Screening)-[plays:PLAYS]->(m:Movie)
            MATCH (t)-[f]->(s)-[isin:IS_IN]->(a:Auditorium)
            MATCH (t)-[seat:SEAT]->(seatNode:Seat)
            RETURN t,r,u,f,s,seat,seatNode, m, a, plays, isin""")
    List<TicketEntity> findAllByUser(String username);

    Optional<TicketEntity> findById(UUID ticketId);

    @Query("""
            MATCH (u:User), (s:Screening), (seat:Seat)
            WHERE u.username = $username AND s.id = $screeningId AND seat.id = $seatId
            CREATE (t:Ticket {id: $uuid, price: $price})
            CREATE (t)-[:OWNED_BY]->(u)
            CREATE (t)-[:FOR]->(s)
            CREATE (t)-[:SEAT]->(seat)
            """)
    void buyTicket(UUID uuid, Double price, String username, UUID screeningId, UUID seatId);
}
