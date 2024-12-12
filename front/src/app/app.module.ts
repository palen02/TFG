import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './jwt.interceptor';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { AppComponent } from './app.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';




@NgModule({
  declarations: [
    AppComponent,
    IniciosesionComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
