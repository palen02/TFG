import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'], // Corregido 'styleUrls' en lugar de 'styleUrl'
})
export class TestComponent implements OnInit {
  minutos: string = '00';
  segundos: string = '10';
  tiempoRestante: number = 10; // 300 segundos = 5 minutos

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.iniciarCuentaRegresiva();
  }

  iniciarCuentaRegresiva(): void {
    const intervalo = setInterval(() => {
      const minutos = Math.floor(this.tiempoRestante / 60);
      const segundos = this.tiempoRestante % 60;

      // Actualiza los valores de minutos y segundos
      this.minutos = minutos < 10 ? '0' + minutos : minutos.toString();
      this.segundos = segundos < 10 ? '0' + segundos : segundos.toString();

      // Redirige al finalizar la cuenta regresiva
      if (this.tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.router.navigate(['examen']); // Redirige a la página del test
      }

      this.tiempoRestante--;
    }, 1000); // Actualización cada segundo
  }
}
