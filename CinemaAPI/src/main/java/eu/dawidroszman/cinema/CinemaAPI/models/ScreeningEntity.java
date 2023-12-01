package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.UUID;

@Getter
@Node("Screening")
public class ScreeningEntity {
    @Id
    @GeneratedValue()
    private final UUID id;
    private String date;
    private String time;
    @Relationship(type = "IS_IN", direction = Relationship.Direction.OUTGOING)
    private AuditoriumEntity auditorium;
    @Relationship(type = "PLAYS")
    private MovieEntity movie;

    public ScreeningEntity(UUID id, String date, String time, AuditoriumEntity auditorium, MovieEntity movie) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.auditorium = auditorium;
        this.movie = movie;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setAuditorium(AuditoriumEntity auditorium) {
        this.auditorium = auditorium;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}
