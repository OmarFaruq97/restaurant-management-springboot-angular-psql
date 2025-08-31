package com.org.restaurant_management.services.auth;

import com.org.restaurant_management.dtos.SignupRequest;
import com.org.restaurant_management.dtos.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);

}
