package com.tfg.spring.app.Tests;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;


@Data
@Entity
@Table(name = "test") // Nombre de la tabla en la base de datos
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pregunta") // Cambiado a id_pregunta
    private Integer idPregunta;
    
        
    @Column(name = "id_file", nullable = false) // Relaciona con la tabla de archivos PDF
    private Integer idFile;

    @Column(name = "pregunta" ,nullable = false)
    private String pregunta;

    @ElementCollection // Permite listas de valores simples
    
    @Column(name = "respuestas", nullable = false)
    private List<String> respuestas;

    @ElementCollection // Permite listas de índices para las respuestas correctas
  
    @Column(name = "correctas", nullable = false)
    private List<String> correctas;
}
