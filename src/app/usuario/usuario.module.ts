import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearUsuarioComponent } from './componentesUsuario/crear-usuario/crear-usuario.component';
import { LeerUsuarioComponent } from './componentesUsuario/leer-usuario/leer-usuario.component';
import { ActualizarUsuarioComponent } from './componentesUsuario/actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from './componentesUsuario/eliminar-usuario/eliminar-usuario.component';
import { UserActualizarComponent } from './componentesUsuario/user-actualizar/user-actualizar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    CrearUsuarioComponent,
    LeerUsuarioComponent,
    ActualizarUsuarioComponent,
    EliminarUsuarioComponent,
    UserActualizarComponent

  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
