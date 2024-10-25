import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginainicioComponent } from './paginainicio/paginainicio.component';
import { PaginatestsComponent } from './paginatests/paginatests.component';
import { TestComponent } from './test/test.component';
import { ExamenComponent } from './examen/examen.component';
export const routes: Routes = [
  {path: '', redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'iniciosesion', component: IniciosesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio', component: PaginainicioComponent},
  {path: 'paginatests', component: PaginatestsComponent},
  {path: 'test', component: TestComponent},
  {path: 'examen', component: ExamenComponent}
];
@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      HttpClientModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }