package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Node("Screening")
public class ScreeningEntity {
    @Id
    @GeneratedValue()
    private final UUID id;
    private String date;
    @Relationship(type = "IS_IN", direction = Relationship.Direction.OUTGOING)
    private AuditoriumEntity auditorium;
    @Relationship(type = "PLAYS")
    private MovieEntity movie;

    public ScreeningEntity(String date, AuditoriumEntity auditorium, MovieEntity movie) {
        this.id = UUID.randomUUID();
        this.date = date;
        this.auditorium = auditorium;
        this.movie = movie;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setAuditorium(AuditoriumEntity auditorium) {
        this.auditorium = auditorium;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}
