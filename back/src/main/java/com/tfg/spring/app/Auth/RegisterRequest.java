package com.tfg.spring.app.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    Integer id;
    
    String username;
    String lastname;
    String firstname;
    String password;
    Integer id_grupo;
   
    
}
