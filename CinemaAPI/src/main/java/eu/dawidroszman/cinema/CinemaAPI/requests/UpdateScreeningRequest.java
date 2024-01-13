package eu.dawidroszman.cinema.CinemaAPI.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateScreeningRequest {
    private UUID id;
    private String date;
    private Integer auditoriumNumber;
    private String movieTitle;
}