package com.tfg.spring.app.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1")

@RequiredArgsConstructor
public class AppController {
    @PostMapping(value="tfg")
    public String welcome() {
        //TODO: process POST request
        
        return "welcome from secure endpoint";
    }
    
    
}
