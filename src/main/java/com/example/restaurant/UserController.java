package com.example.restaurant;

import com.example.restaurant.User;
import com.example.restaurant.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User savedUser = userService.signup(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> loggedInUser = userService.login(user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    }

