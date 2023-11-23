package eu.dawidroszman.cinema.CinemaAPI.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;


@Node("Room")
public class RoomEntity {
    @Id @GeneratedValue
    private final Integer number;
    @Relationship(type = "HAS_SEATS")
    private List<SeatEntity> seats;
    @Relationship(type = "PLAYS_MOVIE")
    private List<MovieEntity> movies;

    public RoomEntity(Integer number) {
        this.number = number;
    }
}
