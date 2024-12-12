package com.tfg.spring.app.Files;


import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "pdf_files")
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "file_size", nullable = false)
    private Integer fileSize;

    @Lob
    @Column(name = "file_content", nullable = false, columnDefinition = "LONGBLOB")
    private byte[] fileContent;

    @Column(name = "id_grupo", nullable = false)
    private Integer idGrupo;

    @Column(name = "file_complex", nullable = false)
    private Integer fileComplex;

    @Column(name = "file_Time", nullable = false)
    private Integer fileTime;

}
