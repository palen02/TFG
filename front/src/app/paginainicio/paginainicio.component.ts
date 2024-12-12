import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-paginainicio',
  standalone: true,
  imports: [NgFor],
  templateUrl: './paginainicio.component.html',
  styleUrls: ['./paginainicio.component.scss'], // Corregido styleUrls
})
export class PaginainicioComponent {
  firstname: string = ''; // Nombre del usuario
  id_grupo: number = 0; // ID del grupo del usuario
  id: number = 0; // ID del grupo del usuario
  fileCount: number = 0; // Contador de ficheros
  resultados: { nombre: string; progreso: number }[] = [
  ]; // Datos de resultados previos

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient // HttpClient para realizar peticiones
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
    
  }

  cargarUsuario(): void {
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        this.firstname = user.firstname;
        this.id_grupo = user.id_grupo;
        this.id=user.id;
        this.cargarFileCount(); // Carga el número de archivos después de obtener el grupo
        this.cargarResultados1();
      },
      (error) => {
        this.router.navigate(['/iniciosesion']);
        
      }
    );
  }

  cargarFileCount(): void {
    this.http.get(`http://localhost:8080/api/files/user/${this.id}/notInResults`).subscribe(
      (response: any) => {
        this.fileCount = response.length; // Calcula el número de archivos
      },
      (error) => {
        console.error('Error al obtener el número de ficheros:', error);
      }
    );
  }
  cargarResultados1(): void {
    this.http.get(`http://localhost:8080/api/files/user/${this.id}/inResults`).subscribe(
      (response: any) => {
        const resultadosPromises = response.map((file: any) => {
          return this.http
            .get(`http://localhost:8080/api/results/user/${this.id}/file/${file.id}`)
            .toPromise()
            .then((progresoResponse: any) => ({
              nombre: file.contentType, // Nombre del archivo
              progreso: progresoResponse || 0, // Progreso devuelto por el backend
            }));
        });
  
        Promise.all(resultadosPromises).then((resultados) => {
          this.resultados = resultados; // Asigna los resultados mapeados al array `resultados`
        });
      },
      (error) => {
        console.error('Error al cargar los archivos:', error);
      }
    );
  }
  
 
  cerrarSesion(): void {
    this.authService.logout();
    
  }

  irAPaginaTests(): void {
    this.router.navigate(['/paginatests']); // Navega a la página de tests
  }

  irAResultados(): void {
    this.router.navigate(['/resultados']); // Navega a la página de resultados
  }
}
