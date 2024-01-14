package eu.dawidroszman.cinema.CinemaAPI.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateScreeningRequest {
    private String date;
    private Integer auditoriumNumber;
    private String movieTitle;
}
