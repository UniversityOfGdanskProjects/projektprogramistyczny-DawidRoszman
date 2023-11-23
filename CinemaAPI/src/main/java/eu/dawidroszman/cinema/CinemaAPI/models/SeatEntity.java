package eu.dawidroszman.cinema.CinemaAPI.models;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Seat")
public class SeatEntity {
    @Id @GeneratedValue
    private final Integer id;
    private final Integer row;
    private final Integer column;
    private final Boolean isVip;
    private final Boolean isTaken;

    public SeatEntity(Integer number, Integer row, Integer column, Boolean isVip, Boolean isTaken) {
        this.id = number;
        this.row = row;
        this.column = column;
        this.isVip = isVip;
        this.isTaken = isTaken;
    }

    public Integer getId() {
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

    public Boolean getTaken() {
        return isTaken;
    }
}
