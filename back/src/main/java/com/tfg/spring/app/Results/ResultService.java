package com.tfg.spring.app.Results;





import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    // Método para obtener resultados por idUsuario
    public List<Result> getResultsByUserId(Integer userId) {
        return resultRepository.findByIdUsuario(userId);
    }
    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }
    public Double getResultByUserIdAndFileId(Integer idUsuario, Integer idFile) {
        Result result = resultRepository.findByIdUsuarioAndIdFile(idUsuario, idFile);
        return result != null ? result.getResultado() : null; // Devuelve el resultado o null si no existe
    }
    
}
