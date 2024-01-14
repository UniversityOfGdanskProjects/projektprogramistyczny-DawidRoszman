package eu.dawidroszman.cinema.CinemaAPI.models;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.UUID;

@Getter
@Node("Seat")
public class SeatEntity {
    @Id @GeneratedValue
    private final UUID id;
    private final Integer row;
    private final Integer column;
    private final Boolean vip;

    public SeatEntity(UUID id, Integer row, Integer column, Boolean vip) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.vip = vip;
    }

}
