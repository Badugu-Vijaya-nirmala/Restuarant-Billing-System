package com.example.restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // use bean!

    public User signup(User user) {
        // Optional: check duplicate email to avoid SQL exception
        userRepository.findByEmail(user.getEmail())
            .ifPresent(u -> { throw new RuntimeException("Email already registered"); });

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
            return userOpt;
        }
        return Optional.empty();
    }
}
