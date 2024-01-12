package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@Node("Screening")
public class ScreeningEntity {
    @Id
    @GeneratedValue()
    private final UUID id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime date;
    @Relationship(type = "IS_IN", direction = Relationship.Direction.OUTGOING)
    private AuditoriumEntity auditorium;
    @Relationship(type = "PLAYS")
    private MovieEntity movie;

    public ScreeningEntity(ZonedDateTime date, AuditoriumEntity auditorium, MovieEntity movie) {
        this.id = UUID.randomUUID();
        this.date = date;
        this.auditorium = auditorium;
        this.movie = movie;
    }

    public ScreeningEntity(UUID id, ZonedDateTime date, AuditoriumEntity auditorium, MovieEntity movie) {
        this.id = id;
        this.date = date;
        this.auditorium = auditorium;
        this.movie = movie;
    }
}
