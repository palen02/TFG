package com.tfg.spring.app.Tests;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    List<Test> findByidFile(Integer idFile); // Coincidir con el nombre exacto de la propiedad
}
