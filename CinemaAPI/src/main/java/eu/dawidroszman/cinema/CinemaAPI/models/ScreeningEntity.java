package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Node("Screening")
public class ScreeningEntity {
    @Id
    @GeneratedValue()
    private final UUID id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime date;
    @Relationship(type = "IS_IN", direction = Relationship.Direction.OUTGOING)
    private AuditoriumEntity auditorium;
    @Relationship(type = "PLAYS")
    private MovieEntity movie;

    public ScreeningEntity(LocalDateTime date, AuditoriumEntity auditorium, MovieEntity movie) {
        this.id = UUID.randomUUID();
        this.date = date;
        this.auditorium = auditorium;
        this.movie = movie;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public void setAuditorium(AuditoriumEntity auditorium) {
        this.auditorium = auditorium;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}
