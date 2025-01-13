package com.tfg.spring.app.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tfg.spring.app.Results.Result;
import com.tfg.spring.app.Results.ResultRepository;
import com.tfg.spring.app.Results.ResultService;
import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultRepository resultRepository;
    private final ResultService resultService; // Inyectar el servicio

    public ResultController(ResultRepository resultRepository, ResultService resultService) {
        this.resultRepository = resultRepository;
        this.resultService = resultService;
    }

    // Endpoint para obtener resultados por idUsuario
    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<Result>> getResultsByUserId(@PathVariable("idUsuario") Integer idUsuario) {
        List<Result> results = resultRepository.findByIdUsuario(idUsuario);
        return ResponseEntity.ok(results);
    }

    // Endpoint para añadir un nuevo resultado
    @PostMapping
    public ResponseEntity<Result> addResult(@RequestBody Result result) {
        Result savedResult = resultService.saveResult(result); // Usar el servicio para guardar el resultado
        return ResponseEntity.ok(savedResult);
    }
    @GetMapping("/user/{idUsuario}/file/{idFile}")
    public ResponseEntity<Double> getResultByUserIdAndFileId(
            @PathVariable Integer idUsuario, 
            @PathVariable Integer idFile) {
        Double resultado = resultService.getResultByUserIdAndFileId(idUsuario, idFile);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
