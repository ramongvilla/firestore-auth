import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfiguracionGuard } from './guards/configuracion.guard';

const routes: Routes = [
  {path:'',component:BoardComponent, canActivate:[AuthGuard]},  
  {path:'',component:BoardComponent},
  {path:'login',component:LoginComponent},
  {path:'registrarse',component:RegistroComponent,canActivate:[ConfiguracionGuard]},
  {path:'configuracion',component:ConfiguracionComponent,canActivate:[AuthGuard]},
  {path:'cliente/editar/:id',component:ModalComponent,canActivate:[AuthGuard]},
  // {path:'cliente/editar',component:ModalComponent},
  {path:'**',component:NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
