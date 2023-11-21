package eu.dawidroszman.cinema.CinemaAPI.repositories;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.Optional;

public interface UserRepository extends Neo4jRepository<UserEntity, String> {
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);
}
