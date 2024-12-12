package com.tfg.spring.app.Results;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "resultados")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "id_usuario",nullable = false)
    private Integer idUsuario;

    @Column(name = "id_file",nullable = false)
    private Integer idFile;

    @Column(name = "resultado",nullable = false)
    private Double resultado;

    // Getters y Setters
}
