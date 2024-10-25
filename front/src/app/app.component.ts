import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HttpClientModule, RouterModule],
   // Asegúrate de tener HttpClientModule en imports
})
export class AppComponent implements OnInit {
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMessage().subscribe(
      (response) => this.message = response,
      (error) => console.error(error)
    );
  }
}


