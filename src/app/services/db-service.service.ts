import { Injectable } from '@angular/core';

import { Database, set, ref,   onValue } from '@angular/fire/database';
import { deleteUser } from 'firebase/auth';
import { remove, update } from 'firebase/database';
import { user } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  dataUsers: any;
  constructor( private database: Database) { }

  crearUsuario( value: user ){
    set( ref( this.database, 'users/' + value.email), value );
  }

  obtenerUsuarios(){

    const starCountRef = ref(this.database, 'users/');
    return starCountRef;
  };



  async actualizarUsuario( value: user , path: string){
    await update( ref( this.database, 'users/' + path  ), value );
  }


  deleteUser( path: string ){
    remove( ref( this.database, 'users/' + path ) );
  }
};
