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
            CALL apoc.create.uuids(1) YIELD uuid
            CREATE (t:Ticket {id: uuid, price: $price})
            WITH t, uuid
            MATCH (u:User {username: $username})
            CREATE (t)-[:OWNED_BY]->(u)
            WITH t, uuid
            MATCH (s:Screening {id: $screeningId})
            CREATE (t)-[:FOR]->(s)
            WITH t, uuid
            UNWIND $seatIds AS seatId
            MATCH (seat:Seat {id: seatId})
            CREATE (t)-[:SEAT]->(seat)
            WITH uuid
            RETURN uuid
            """)
    List<UUID> buyTicket(Double price, String username, UUID screeningId, List<UUID> seatIds);

    @Query("MATCH (t:Ticket {id: $uuid}) RETURN t.id")
    UUID getTicketById(UUID uuid);
}
