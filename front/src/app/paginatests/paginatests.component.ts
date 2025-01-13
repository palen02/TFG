import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-paginatests',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './paginatests.component.html',
  styleUrls: ['./paginatests.component.scss'], // Corregido 'styleUrls'
})
export class PaginatestsComponent implements OnInit {
  tests: any[] = []; // Aquí se guardarán los tests obtenidos del backend
  id_grupo: number = 0;
  username: any;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }
  cerrarSesion(): void {
    this.authService.logout();
    
  }
  
 

  cargarUsuario(): void {
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        this.id_grupo = user.id; // Extrae el id_grupo del usuario
        this.username= user.firstname;
        this.cargarTests(); // Llama a cargarTests después de obtener el usuario
      },
      (error: any) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  cargarTests(): void {
    this.http.get(`http://localhost:8080/api/files/user/${this.id_grupo}/notInResults`).subscribe(
      (response: any) => {
        this.tests = response.map((test: any) => ({
          name: test.fileName, // Nombre del test sin extensión
          type: test.contentType,
          id: test.id,
          complexity: this.mapComplexity(test.fileComplex), // Mapeo de la dificultad
          duration: (test.fileTime / 60).toFixed(1) + ' min'
          // Duración en minutos
        }));
      },
      (error) => {
        console.error('Error al cargar los tests:', error);
      }
    );
  }

  mapComplexity(complexity: number): string {
    switch (complexity) {
      case 3:
        return 'Difícil';
      case 2:
        return 'Medio';
      case 1:
        return 'Fácil';
      default:
        return 'Desconocida';
    }
  }

  realizarTest(id_file: number): void {
    this.router.navigate(['/test'], { queryParams: { id_file: id_file } });
  }
}
