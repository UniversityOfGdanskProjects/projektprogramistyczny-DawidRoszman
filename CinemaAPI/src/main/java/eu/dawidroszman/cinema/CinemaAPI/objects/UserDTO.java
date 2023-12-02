package eu.dawidroszman.cinema.CinemaAPI.objects;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;


public record UserDTO(String firstName, String lastName, String email) {
    public static UserDTO from(UserEntity user) {
        return new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail());
    }
}
