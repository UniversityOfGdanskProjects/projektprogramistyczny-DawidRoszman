package eu.dawidroszman.cinema.CinemaAPI.objects;

import java.util.UUID;

public record Order(UUID id, String discount) {
}
