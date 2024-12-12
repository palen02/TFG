package com.tfg.spring.app.Files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;



@Repository
public interface FileRepository extends JpaRepository<Files, Integer> {

    // Archivos que NO están en resultados según el grupo del usuario
    @Query("""
        SELECT f 
        FROM Files f 
        JOIN User u ON u.id_grupo = f.idGrupo
        WHERE u.id = :idUsuario 
          AND f.id NOT IN (SELECT r.idFile FROM Result r WHERE r.idUsuario = :idUsuario)
    """)
    List<Files> findFilesNotInResultsByUserId(@Param("idUsuario") Integer idUsuario);

    // Archivos que SÍ están en resultados según el grupo del usuario
    @Query("""
        SELECT f 
        FROM Files f 
        JOIN User u ON u.id_grupo = f.idGrupo
        WHERE u.id = :idUsuario 
          AND f.id IN (SELECT r.idFile FROM Result r WHERE r.idUsuario = :idUsuario)
    """)
    List<Files> findFilesInResultsByUserId(@Param("idUsuario") Integer idUsuario);

    Files findFilesInResultsById(Integer id);
}
