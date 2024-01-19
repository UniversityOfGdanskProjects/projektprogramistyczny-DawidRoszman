package eu.dawidroszman.cinema.CinemaAPI.repositories;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.objects.TicketSalesReportObject;
import org.neo4j.driver.Result;
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
            RETURN t,r,u,f,s, m, a, plays, isin""")
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


    @Query("""
            MATCH (t:Ticket)-[:FOR]->(s:Screening)
            WHERE apoc.date.format(s.date.epochMillis, 'ms', 'yyyy-MM-dd') = $date
            RETURN count(t) AS ticketCount, sum(t.price) AS totalSum, $date AS date
            """)
    TicketSalesReportObject countAndSumTicketsForDate(String date);

    @Query("""
            MATCH (t:Ticket)-[:FOR]->(s:Screening)
            WHERE apoc.date.format(s.date.epochMillis, 'ms', 'yyyy-MM') = $date
            RETURN count(t) AS ticketCount, sum(t.price) AS totalSum, $date AS date
            """)
    TicketSalesReportObject countAndSumTicketsForMonth(String date);

    @Query("""
            MATCH (t:Ticket)-[:FOR]->(s:Screening)
            WHERE apoc.date.format(s.date.epochMillis, 'ms', 'yyyy-MM-dd') >= $startDate AND apoc.date.format(s.date.epochMillis, 'ms', 'yyyy-MM-dd') <= $endDate
            RETURN apoc.date.format(s.date.epochMillis, 'ms', 'yyyy-MM-dd') AS date, count(t) AS ticketCount, sum(t.price) AS totalSum
            ORDER BY date
            """)
    List<TicketSalesReportObject> countAndSumTicketsForDateRange(String startDate, String endDate);

    @Query("""
            MATCH (t:Ticket)-[:SEAT]->(s:Seat)
            WHERE t.id = $id
            RETURN s.id AS id, s.row AS row, s.column AS column, s.vip AS vip
            """)
    List<SeatEntity> getSeatByTicketId(UUID id);
}
