package com.tfg.spring.app.Results;



import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ResultRepository extends JpaRepository<Result, Integer> {
    List<Result> findByIdUsuario(Integer idUsuario);
    Result findByIdUsuarioAndIdFile(Integer idUsuario, Integer idFile);
}

