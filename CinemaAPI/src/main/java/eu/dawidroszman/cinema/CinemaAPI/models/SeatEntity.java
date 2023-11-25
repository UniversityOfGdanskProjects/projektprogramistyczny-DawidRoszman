package eu.dawidroszman.cinema.CinemaAPI.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.util.UUID;

@Node("Seat")
public class SeatEntity {
    @Id @GeneratedValue
    private final UUID id;
    private final Integer row;
    private final Integer column;
    private final Boolean isVip;

    public SeatEntity(UUID id, Integer row, Integer column, Boolean isVip) {
        this.id = id;
        this.row = row;
        this.column = column;
        this.isVip = isVip;
    }

    public UUID getId() {
        return id;
    }

    public Integer getRow() {
        return row;
    }

    public Integer getColumn() {
        return column;
    }

    public Boolean getVip() {
        return isVip;
    }

}
