package com.org.restaurant_management.controllers;

import com.org.restaurant_management.dtos.AuthenticationRequest;
import com.org.restaurant_management.dtos.AuthenticationResponse;
import com.org.restaurant_management.dtos.SignupRequest;
import com.org.restaurant_management.dtos.UserDto;
import com.org.restaurant_management.services.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
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
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    (authenticationRequest.getEmail(), authenticationRequest.getPassword())));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password");
        }catch (DisabledException disabledException){
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User not active");
            return  null;
        }
    }
}
