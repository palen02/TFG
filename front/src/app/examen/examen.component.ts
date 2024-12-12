import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [NgFor],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent {
  preguntas: any[] = []; // Almacenará las preguntas obtenidas del backend
  idfile: number = 0; // ID del archivo asociado al examen
  idUsuario: number = 402; // ID del usuario (puedes modificarlo dinámicamente según tu aplicación)
  resultado: number = 0; // Resultado calculado del examen
  firstname: any;
  id: any;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,private authService: AuthService) {}

  
  ngOnInit(): void {
    // Recuperar el id_file como un número desde los query params
    this.idfile = +this.route.snapshot.queryParams['id_file']; // El '+' convierte el valor en número
    this.cargarUsuario();
    this.cargarPreguntas(this.idfile);
  }
  cargarUsuario(): void {
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        this.firstname = user.firstname;
        this.id=user.id;
       
      },
      (error) => {
        this.router.navigate(['/iniciosesion']);
        
      }
    );
  }

  cargarPreguntas(id_file: number): void {
    this.http.get(`http://localhost:8080/api/tests/${id_file}`).subscribe({
      next: (response: any) => {
        this.preguntas = response.map((pregunta: any) => ({
          ...pregunta,
          respuestas: pregunta.respuestas[0].split(',').map((r: string) => r.trim()),
          correctas: pregunta.correctas[0].split(',').map((c: string) => parseInt(c.trim(), 10))
        }));
      },
      error: (error) => {
        console.error('Error al cargar las preguntas:', error);
      }
    });
  }
  cerrarSesion(): void {
    this.authService.logout();
    
  }

  enviarExamen(event: Event): void {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  
    const formData = new FormData(event.target as HTMLFormElement);
    let respuestasCorrectas = 0;
  
    // Procesar las respuestas seleccionadas para cada pregunta
    this.preguntas.forEach((pregunta: { correctas: number[] }, index: number) => {
      const respuestasSeleccionadas: number[] = formData
        .getAll(`pregunta${index}`) // Obtiene todas las respuestas seleccionadas
        .map((value: FormDataEntryValue) => parseInt(value as string, 10)); // Convierte a números
  
      // Validar que:
      // 1. Todas las seleccionadas estén entre las correctas.
      // 2. Todas las correctas estén seleccionadas.
      const esCorrecta: boolean =
        respuestasSeleccionadas.every((respuesta: number) => pregunta.correctas.includes(respuesta)) &&
        pregunta.correctas.every((correcta: number) => respuestasSeleccionadas.includes(correcta));
  
      if (esCorrecta) {
        respuestasCorrectas++; // Incrementa el contador si la pregunta fue correctamente respondida
      }
    });
  
    // Calcular el porcentaje de aciertos
    this.resultado = (respuestasCorrectas / this.preguntas.length) * 100;
  
    console.log('Resultado calculado:', this.resultado);
  
    // Enviar el resultado al backend
    this.http.post(`http://localhost:8080/api/results`, {
      idUsuario: this.idUsuario,
      idFile: this.idfile,
      resultado: this.resultado
    }).subscribe({
      next: () => {
        console.log('Resultado enviado correctamente');
        this.router.navigate(['/inicio']); // Redirigir tras enviar el resultado
      },
      error: (error) => {
        console.error('Error al enviar el resultado:', error);
      }
    });
  }
}
