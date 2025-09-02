package com.org.restaurant_management.controllers;

import com.org.restaurant_management.dtos.SignupRequest;
import com.org.restaurant_management.dtos.UserDto;
import com.org.restaurant_management.services.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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
}
