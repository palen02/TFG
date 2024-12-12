package com.tfg.spring.app.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.tfg.spring.app.User.User;
import com.tfg.spring.app.User.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Devuelve 401 si no hay autenticación
        }

        // Encuentra al usuario por su username
        String username = userDetails.getUsername();
        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).build(); // Devuelve 404 si no se encuentra el usuario
        }

        return ResponseEntity.ok(user); // Devuelve el usuario autenticado
    }
}