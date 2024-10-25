import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginainicio',
  standalone: true,
  imports: [],
  templateUrl: './paginainicio.component.html',
  styleUrl: './paginainicio.component.scss'
})
export class PaginainicioComponent {
  constructor(
    private router: Router
  ) { }
  irAPaginaTests() {
    this.router.navigate([`/paginatests`]);
  }
}
