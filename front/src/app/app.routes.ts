import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { RegistroComponent } from './registro/registro.component';
import { PaginainicioComponent } from './paginainicio/paginainicio.component';
import { PaginatestsComponent } from './paginatests/paginatests.component';
import { TestComponent } from './test/test.component';
import { ExamenComponent } from './examen/examen.component';
import { AuthGuard } from '../app/services/auth.guard';
export const routes: Routes = [
  {path: '', redirectTo: '/iniciosesion', pathMatch: 'full'},
  {path: 'iniciosesion', component: IniciosesionComponent},
  {path: 'registro', component: RegistroComponent,  canActivate: [AuthGuard]},
  {path: 'inicio', component: PaginainicioComponent, canActivate: [AuthGuard] },
  {path: 'paginatests', component: PaginatestsComponent,  canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent,  canActivate: [AuthGuard]},
  {path: 'examen', component: ExamenComponent,  canActivate: [AuthGuard]}
];
@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      HttpClientModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }