import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearUsuarioComponent } from './componentesUsuario/crear-usuario/crear-usuario.component';
import { LeerUsuarioComponent } from './componentesUsuario/leer-usuario/leer-usuario.component';
import { ActualizarUsuarioComponent } from './componentesUsuario/actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from './componentesUsuario/eliminar-usuario/eliminar-usuario.component';


@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    CrearUsuarioComponent,
    LeerUsuarioComponent,
    ActualizarUsuarioComponent,
    EliminarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
