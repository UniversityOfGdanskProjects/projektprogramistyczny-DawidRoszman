package eu.dawidroszman.cinema.CinemaAPI.services;

import org.springframework.stereotype.Service;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.UserRepository;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }
}
