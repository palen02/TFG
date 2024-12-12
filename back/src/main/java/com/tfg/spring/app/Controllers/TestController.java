package com.tfg.spring.app.Controllers;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tfg.spring.app.Tests.Test;
import com.tfg.spring.app.Tests.TestRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final TestRepository testRepository;

    public TestController(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    // Obtener todas las preguntas asociadas a un id_file
    @GetMapping("/{id_File}")
    public ResponseEntity<List<Test>> getTestsByFile(@PathVariable Integer id_File) {
        List<Test> tests = testRepository.findByidFile(id_File);
        return ResponseEntity.ok(tests);
    }
}
