import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  credentials = { username: '', password: '', firstname: '', lastname: '' };
  confirmPassword: string = '';
  registerFormSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.registerFormSubmitted = true;

    // Validar campos vacíos
    if (
      !this.credentials.username.trim() ||
      !this.credentials.password.trim() ||
      !this.credentials.firstname.trim() ||
      !this.credentials.lastname.trim()
    ) {
      
      return;
    }

    // Validar coincidencia de contraseñas
    if (this.credentials.password !== this.confirmPassword) {
      
      return;
    }

    // Enviar al backend si todo es válido
    this.authService.register(this.credentials).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/iniciosesion']);
      },
      error: (error) => {
        console.error('Error durante el registro:', error);
        alert('Hubo un problema con el registro. Intenta de nuevo.');
      }
    });
  }
}
