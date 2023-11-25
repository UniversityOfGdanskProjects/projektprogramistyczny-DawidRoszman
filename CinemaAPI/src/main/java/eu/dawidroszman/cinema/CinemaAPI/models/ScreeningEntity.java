package eu.dawidroszman.cinema.CinemaAPI.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.UUID;

@Node("Screening")
public class ScreeningEntity {
    @Id
    @GeneratedValue()
    private UUID id;
    private String date;
    private String time;
    @Relationship(type = "IS_IN")
    private AuditoriumEntity auditorium;
    @Relationship(type = "PLAYS")
    private MovieEntity movie;

    public ScreeningEntity(String date, String time, AuditoriumEntity auditorium, MovieEntity movie) {
        this.date = date;
        this.time = time;
        this.auditorium = auditorium;
        this.movie = movie;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public AuditoriumEntity getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(AuditoriumEntity auditorium) {
        this.auditorium = auditorium;
    }

    public MovieEntity getMovie() {
        return movie;
    }

    public void setMovie(MovieEntity movie) {
        this.movie = movie;
    }
}
