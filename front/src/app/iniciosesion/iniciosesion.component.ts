import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.scss'
})
export class IniciosesionComponent {
  constructor(
    private router: Router
  ) { }
  irAPaginaRegistro() {
    this.router.navigate([`/registro`]);
  }
  irAPaginaInicio() {
    this.router.navigate([`/inicio`]);
  }


}
