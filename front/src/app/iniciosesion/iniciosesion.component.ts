import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.scss'],
})
export class IniciosesionComponent {
  credentials = { username: '', password: '' };
  errorMessage: string = ''; // Variable para mostrar errores
  loginFormSubmitted = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  irAPaginaRegistro() {
    this.router.navigate(['/registro']);
  }

  irAPaginaInicio() {
    this.router.navigate(['/inicio']);
  }

  

  login1() {
    this.loginFormSubmitted = true;

    // Validar campos vacíos
    if (!this.credentials.username.trim() || !this.credentials.password.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    // Realizar la solicitud de inicio de sesión
    this.authService.login(this.credentials);
  }
}
