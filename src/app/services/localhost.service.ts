import { Injectable } from '@angular/core';
import { user } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class LocalhostService {

  constructor() { }



  añadirUsuarioLocalStorage( user: user ){
    localStorage.setItem( "user" , JSON.stringify( user ) );
  }


  obtenerUsuarioLocalStorage(): user  | null{

    if( localStorage.getItem("user") ) return JSON.parse( localStorage.getItem("user")! );
    else return null;
  }

  eliminarUsuarioLocalStorage(){
    localStorage.removeItem("user");
  }
}
