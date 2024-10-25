import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'] // Corregido 'styleUrls'
})
export class ExamenComponent {

  constructor(private router: Router) {}

  enviarExamen(event: Event): void {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const formData = new FormData(event.target as HTMLFormElement);

    // Recopilar las respuestas del formulario
    const respuestas = {
      pregunta1: formData.get('pregunta1'),
      pregunta2: formData.get('pregunta2'),
      pregunta3: formData.get('pregunta3'),
      pregunta4: formData.get('pregunta4')
    };

    console.log('Respuestas enviadas:', respuestas);

    // Aquí puedes añadir lógica para validar las respuestas o enviarlas a un servidor
    // Redirige a una página de resultados o confirma el envío
    this.router.navigate(['/resultados-test']); // Cambia la ruta según sea necesario
  }
}
