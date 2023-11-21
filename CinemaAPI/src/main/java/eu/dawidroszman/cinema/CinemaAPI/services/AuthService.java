package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.UserRepository;
import eu.dawidroszman.cinema.CinemaAPI.requests.RegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return false;
        }
        var user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .roles("ROLE_USER")
                .build();
        userRepository.save(user);
        return true;
    }
}
