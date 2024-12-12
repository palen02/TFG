// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Base URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  
  
  getCurrentUser() {
    const token = this.getToken(); // Esto llama al método y devuelve el token
    // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Construye los headers con el token
  
    return this.http.get('http://localhost:8080/api/user/me', { headers });
  }
  
  

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
    
  }
  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).subscribe((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        
        this.router.navigate(['inicio']);
      }
    });
  }
  


  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem('token');
      
      // Si no hay token en el localStorage, no está autenticado
      if (!token) {
        resolve(false);
        return;
      }
  
      // Llama a getCurrentUser para verificar si el token es válido
      this.getCurrentUser()?.subscribe({
        next: () => {
          resolve(true); // Si la respuesta es exitosa, está autenticado
        },
        error: () => {
          resolve(false); // Si hay error, el token no es válido
        }
      });
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}
