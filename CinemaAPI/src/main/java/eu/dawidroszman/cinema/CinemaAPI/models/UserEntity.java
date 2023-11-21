package eu.dawidroszman.cinema.CinemaAPI.models;

import eu.dawidroszman.cinema.CinemaAPI.enums.Role;
import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Node("User")
public class UserEntity {
    @Id
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String roles;

}
