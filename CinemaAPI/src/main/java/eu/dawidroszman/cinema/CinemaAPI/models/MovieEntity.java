package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.*;

import java.util.HashSet;
import java.util.Set;

import static org.springframework.data.neo4j.core.schema.Relationship.Direction.INCOMING;

@Getter
@Node("Movie")
public class MovieEntity {
    @Id
    private final String title;
    @Property("tagline")
    private final String description;
    @Relationship(type = "ACTED_IN", direction = INCOMING)
    private Set<PersonEntity> actors = new HashSet<>();
    @Relationship(type = "DIRECTED", direction = INCOMING)
    private Set<PersonEntity> directors = new HashSet<>();
    public MovieEntity(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void setActors(Set<PersonEntity> actors) {
        this.actors = actors;
    }

    public void setDirectors(Set<PersonEntity> directors) {
        this.directors = directors;
    }
}