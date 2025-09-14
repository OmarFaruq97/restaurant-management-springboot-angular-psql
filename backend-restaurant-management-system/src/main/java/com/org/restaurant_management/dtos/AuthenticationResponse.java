package com.org.restaurant_management.dtos;

import com.org.restaurant_management.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AuthenticationResponse {

    private String jwt;
    private UserRole userRole;
    private Long userId;
}
