package com.org.restaurant_management.util;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    public  String generateToken(String email){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }
    private  String createToken(Map<String, Object> claims, String email){
        return Jwts.builders();
    }
}
