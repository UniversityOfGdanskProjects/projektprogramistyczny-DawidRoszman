package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;


@Getter
@Node("Auditorium")
public class AuditoriumEntity {
    @Id
    private final Integer number;
    @Relationship(type = "HAS")
    private List<SeatEntity> seats;

    public AuditoriumEntity(Integer number) {
        this.number = number;
    }

    public void setSeats(List<SeatEntity> seats) {
        this.seats = seats;
    }
}
