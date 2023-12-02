package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.models.UserEntity;
import eu.dawidroszman.cinema.CinemaAPI.objects.UserDTO;
import eu.dawidroszman.cinema.CinemaAPI.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-info")
    public UserDTO getUserInfo(Principal principal) {
        UserEntity user = userService.getUserByUsername(principal.getName());
        return UserDTO.from(user);
    }

}
