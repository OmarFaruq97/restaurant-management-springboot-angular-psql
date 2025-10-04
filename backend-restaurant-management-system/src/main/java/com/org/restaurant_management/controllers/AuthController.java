package com.org.restaurant_management.controllers;

import com.org.restaurant_management.dtos.AuthenticationRequest;
import com.org.restaurant_management.dtos.AuthenticationResponse;
import com.org.restaurant_management.dtos.SignupRequest;
import com.org.restaurant_management.dtos.UserDto;
import com.org.restaurant_management.entities.User;
import com.org.restaurant_management.repositories.UserRepository;
import com.org.restaurant_management.services.auth.AuthService;
import com.org.restaurant_management.services.jwt.UserDetailsServiceImplement;
import com.org.restaurant_management.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImplement userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, UserDetailsServiceImplement userDetailsServiceImplement, UserDetailsServiceImplement userDetailsService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        UserDto createUserDto = authService.createUser(signupRequest);

        if (createUserDto == null) {
            return new ResponseEntity<>("user not created. come again later", HttpStatus.BAD_REQUEST);
        }
        // Return 201 OK instead of 200
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);

        // Return 200 OK instead of 201
        /*
        return new ResponseEntity<>(createUserDto, HttpStatus.OK);
        */
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response)
            throws IOException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not active");
            return null;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
            authenticationResponse.setUserId(optionalUser.get().getId());
        } else {
            throw new RuntimeException("User not found");
        }
        return authenticationResponse;
    }
}
