package eu.dawidroszman.cinema.CinemaAPI.controllers;

import eu.dawidroszman.cinema.CinemaAPI.requests.LoginRequest;
import eu.dawidroszman.cinema.CinemaAPI.requests.RegisterRequest;
import eu.dawidroszman.cinema.CinemaAPI.services.AuthService;
import eu.dawidroszman.cinema.CinemaAPI.services.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    private final AuthService authService;



    public AuthController(TokenService tokenService, AuthenticationManager authenticationManager, AuthService authService) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @PostMapping("/login")
    public String token(@RequestBody LoginRequest userLogin) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword()));
        return tokenService.generateToken(authentication);
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

}
