package eu.dawidroszman.cinema.CinemaAPI.models;

import java.util.UUID;

import lombok.Getter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Node("Ticket")
public class TicketEntity {
    @Id
    @GeneratedValue
    private UUID id;

    @Relationship("OWNED_BY")
    private UserEntity user;

    @Relationship("FOR")
    private ScreeningEntity screening;

    @Relationship("SEAT")
    private SeatEntity seat;

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setScreening(ScreeningEntity screening) {
        this.screening = screening;
    }

    public void setSeat(SeatEntity seat) {
        this.seat = seat;
    }

}
