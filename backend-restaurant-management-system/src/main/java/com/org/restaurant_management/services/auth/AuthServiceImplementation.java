package com.org.restaurant_management.services.auth;

import com.org.restaurant_management.dtos.SignupRequest;
import com.org.restaurant_management.dtos.UserDto;
import com.org.restaurant_management.entities.User;
import com.org.restaurant_management.enums.UserRole;
import com.org.restaurant_management.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImplementation implements AuthService {

    private final UserRepository userRepository;


    @Autowired

    public AuthServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override
    public UserDto createUser(SignupRequest signupRequest) {

        // Create a new User entity and set its properties from the SignupRequest DTO
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        // Encrypt the password before saving to database
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);

        // Create UserDto object to return after saving
        UserDto createUserDto = new UserDto();

        // Save the user entity to the database
        User createUser = userRepository.save(user);
        createUserDto.setId(createUser.getId());
        createUserDto.setName(createUser.getName());
        createUserDto.setEmail(createUser.getEmail());
        createUserDto.setUserRole(createUser.getUserRole());

        return createUserDto;
    }
}
