package com.org.restaurant_management.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest {
    private  String email;
    private  String password;
}
