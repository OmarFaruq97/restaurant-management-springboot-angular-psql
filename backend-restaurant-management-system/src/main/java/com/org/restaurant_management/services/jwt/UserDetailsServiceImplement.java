package com.org.restaurant_management.services.jwt;

import com.org.restaurant_management.entities.User;
import com.org.restaurant_management.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImplement implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImplement(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //write logic to get user db
        Optional<User> optionalUser = userRepository.findFirstByEmail(email);
        if (optionalUser.isEmpty()) throw new UsernameNotFoundException("User not found", null);
        return new org.springframework.security.core.userdetails.User(
                optionalUser.get().getEmail(),
                optionalUser.get().getPassword(),
                new ArrayList<>());


    }
}
