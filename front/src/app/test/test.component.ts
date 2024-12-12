import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

interface FileData {
  fileName: string;
  fileSize: number;
  id: number;
  contentType: string;
  fileTime: number;
  fileContent: string;
}

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  fileName: string = '';
  idfile: number = 0;
  minutos: string = '0';
  segundos: string = '0';
  tiempoRestante: number = 600; // 600 segundos = 10 minutos
  pdfData: FileData | null = null;
  pdfUrl: SafeResourceUrl = '';
  firstname: any;
  id: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idfile = +this.route.snapshot.queryParams['id_file'];
    this.cargarUsuario();
    this.iniciarCuentaRegresiva();
    this.cargarPDF(this.idfile);

    // Prevenir navegación hacia atrás
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.pushState(null, '', location.href);
      alert('La navegación hacia atrás está deshabilitada mientras lees el test.');
    };
  }

  @HostListener('window:beforeunload', ['$event'])
  preventRefresh(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = ''; // Mensaje genérico
  }

  @HostListener('document:keydown', ['$event'])
  disableKeys(event: KeyboardEvent): void {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
      event.preventDefault();
      alert('Refrescar está deshabilitado.');
    }
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault();
      alert('Navegación hacia atrás está deshabilitada.');
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
    alert('El clic derecho está deshabilitado.');
  }

  cargarUsuario(): void {
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        this.firstname = user.firstname;
        this.id = user.id;
      },
      (error) => {
        this.router.navigate(['/iniciosesion']);
      }
    );
  }
  cerrarSesion(): void {
    this.authService.logout();
    
  }
  

  cargarPDF(idfile: number): void {
    this.http.get<any>(`http://localhost:8080/api/files/${idfile}`).subscribe(
      (file: any) => {
        this.fileName = file.fileName.replace('.pdf', '');
        this.pdfData = file;
        this.tiempoRestante = file.fileTime;
        this.idfile = file.id;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:application/pdf;base64,${file.fileContent}`
        );
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  confirmarIrAExamen(): void {
    const confirmar = window.confirm('¿Seguro que quieres ir al examen? Una vez confirmado, no podrás volver.');
    if (confirmar) {
      this.router.navigate(['/examen'], { queryParams: { id_file: this.idfile } });
    }
  }

  iniciarCuentaRegresiva(): void {
    const intervalo = setInterval(() => {
      const minutos = Math.floor(this.tiempoRestante / 60);
      const segundos = this.tiempoRestante % 60;

      this.minutos = minutos < 10 ? '0' + minutos : minutos.toString();
      this.segundos = segundos < 10 ? '0' + segundos : segundos.toString();

      if (this.tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.router.navigate(['examen'], { queryParams: { id_file: this.idfile } });
      }

      this.tiempoRestante--;
    }, 1000);
  }
}
