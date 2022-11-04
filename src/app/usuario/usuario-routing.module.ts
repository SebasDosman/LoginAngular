import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { CrearUsuarioComponent } from './componentesUsuario/crear-usuario/crear-usuario.component';
import { LeerUsuarioComponent } from './componentesUsuario/leer-usuario/leer-usuario.component';
import { ActualizarUsuarioComponent } from './componentesUsuario/actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from './componentesUsuario/eliminar-usuario/eliminar-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserActualizarComponent } from './componentesUsuario/user-actualizar/user-actualizar.component';




const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    { path: 'crearUsuario'          , component : CrearUsuarioComponent       },
    { path: 'leerUsuario'           , component : LeerUsuarioComponent        },
    { path: 'actualizarUsuario'     , component : ActualizarUsuarioComponent  },
    { path: 'actualizarUsuario/:id' , component : UserActualizarComponent     },
    { path: 'eliminarUsuario'       , component : EliminarUsuarioComponent    },
    { path: '**'                    , redirectTo: 'crearUsuario'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
