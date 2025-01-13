package com.tfg.spring.app.Files;

import org.springframework.stereotype.Service;

import com.tfg.spring.app.Results.ResultRepository;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public List<Files> getFilesNotInResultsByUserId(Integer idUsuario) {
        return fileRepository.findFilesNotInResultsByUserId(idUsuario);
    }

    public List<Files> getFilesInResultsByUserId(Integer idUsuario) {
        return fileRepository.findFilesInResultsByUserId(idUsuario);
    }
   

    public Files findFilesInResultsById(Integer id) {
        return fileRepository.findFilesInResultsById(id);
    }
}
