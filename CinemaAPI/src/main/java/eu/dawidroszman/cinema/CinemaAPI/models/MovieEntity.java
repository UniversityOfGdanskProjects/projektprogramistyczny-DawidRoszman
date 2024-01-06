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
    @Property
    private final Integer released;
    @Property
    private final String imageUrl;
    @Property
    private final String trailer;
    @Relationship(type = "ACTED_IN", direction = INCOMING)
    private Set<PersonEntity> actors = new HashSet<>();
    @Relationship(type = "DIRECTED", direction = INCOMING)
    private Set<PersonEntity> directors = new HashSet<>();

    public MovieEntity(String title, String description, Integer released, String imageUrl, String trailer) {
        this.title = title;
        this.description = description;
        this.released = released;
        this.imageUrl = imageUrl;
        this.trailer = trailer;
    }

    public void setActors(Set<PersonEntity> actors) {
        this.actors = actors;
    }

    public void setDirectors(Set<PersonEntity> directors) {
        this.directors = directors;
    }
}
