import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserVigilantGuardGuard implements CanActivate {


  valorRetorno: boolean = false;
  constructor( private afauth : AngularFireAuth, private router: Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        return this.goToDashboard()
  }


  goToDashboard(): boolean{
    this.afauth.currentUser.then( (user: any) => {
      
      
      if( user ) {
        this.valorRetorno = true;
        this.router.navigate(['/usuario/dashboard']);
      }
      else{
         this.valorRetorno = false;

      }
    })
    return this.valorRetorno;
  }
}
