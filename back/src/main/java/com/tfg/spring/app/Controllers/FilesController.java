package com.tfg.spring.app.Controllers;

import com.tfg.spring.app.Files.FileService;
import com.tfg.spring.app.Files.Files;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/files")
public class FilesController {

    private final FileService fileService;

    public FilesController(FileService fileService) {
        this.fileService = fileService;
    }

    // Archivos que NO están en resultados para el usuario
    @GetMapping("/user/{idUsuario}/notInResults")
    public ResponseEntity<List<Files>> getFilesNotInResultsByUserId(@PathVariable Integer idUsuario) {
        List<Files> files = fileService.getFilesNotInResultsByUserId(idUsuario);
        return ResponseEntity.ok(files);
    }

    // Archivos que SÍ están en resultados para el usuario
    @GetMapping("/user/{idUsuario}/inResults")
    public ResponseEntity<List<Files>> getFilesInResultsByUserId(@PathVariable Integer idUsuario) {
        List<Files> files = fileService.getFilesInResultsByUserId(idUsuario);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Files> getFilesInResultsByFileId(@PathVariable Integer id) {
        Files file = fileService.findFilesInResultsById(id);
        return ResponseEntity.ok(file);
    }

}
