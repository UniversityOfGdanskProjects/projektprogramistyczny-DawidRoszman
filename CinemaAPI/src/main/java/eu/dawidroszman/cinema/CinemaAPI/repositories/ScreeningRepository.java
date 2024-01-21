package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.ScreeningEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.SeatEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ScreeningRepository extends Neo4jRepository<ScreeningEntity, UUID> {
    @Query("MATCH (m:Movie)<-[p:PLAYS]-(s:Screening)-[i:IS_IN]->(a:Auditorium) RETURN m,p,s,i,a ORDER BY s.date ASC")
    List<ScreeningEntity> findAll();

    @Query("""
            MATCH (m:Movie)<-[p:PLAYS]-(s:Screening)-[i:IS_IN]->(a:Auditorium)
            WHERE m.title = $movieTitle AND a.number = $auditoriumNumber AND s.date = datetime($date)
            RETURN m,p,s,i,a
            """)
    Optional<ScreeningEntity> findByDateAndAuditoriumAndMovie(ZonedDateTime date, Integer auditoriumNumber, String movieTitle);

    Optional<ScreeningEntity> findById(UUID screeningId);

    @Query("""
            MATCH (m:Movie)<-[p:PLAYS]-(s:Screening)-[i:IS_IN]->(a:Auditorium)
            WHERE s.date = datetime($date) AND a.number = $auditoriumNumber
            RETURN m,p,s,i,a
            """)
    Optional<ScreeningEntity> findByDateAndAuditorium(ZonedDateTime date, Integer auditoriumNumber);

    @Query("""
            MATCH (m:Movie), (a:Auditorium)
            WHERE m.title = $movieTitle AND a.number = $auditoriumNumber
            CREATE (m)<-[p:PLAYS]-(s:Screening {id: $id, date: datetime($date)})-[i:IS_IN]->(a);
            """)
    void createScreening(UUID id, ZonedDateTime date, Number auditoriumNumber, String movieTitle);

    @Query("""
            MATCH (seat:Seat {id: $seatId})<-[:SEAT]-(t:Ticket)-[:FOR]->(s:Screening {id: $screeningId}) RETURN count(seat) > 0
            """)
    boolean isSeatTaken(UUID screeningId, UUID seatId);

    @Query("""
            MATCH (seat:Seat)<-[:SEAT]-(t:Ticket)-[:FOR]->(s:Screening {id: $screeningId}) RETURN seat.id
            """)
    List<UUID> getSeatsTaken(UUID screeningId);

    @Query("""
            MATCH (t:Ticket)-[:FOR]->(s:Screening)-[:PLAYS]->(m:Movie)
            RETURN m.title AS movieTitle, count(t) AS ticketCount
            ORDER BY ticketCount DESC
            LIMIT 1
            """)
    String mostPopularMovie();
}
