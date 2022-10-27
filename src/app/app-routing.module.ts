import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserVigilantGuardGuard } from './guards/user-vigilant-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m=> m.AuthModule )
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioModule ),
    canActivate: [ UserVigilantGuardGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
