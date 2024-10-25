package com.tfg.spring.app.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class HolaMundo {

    @GetMapping("/message")
    public String getMessage() {
        return "Hello from Spring Boot!";
    }
}
