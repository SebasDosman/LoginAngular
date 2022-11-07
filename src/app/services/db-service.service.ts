import { Injectable } from '@angular/core';

import { Database, set, ref,   onValue } from '@angular/fire/database';
import { deleteUser } from 'firebase/auth';
import { remove, update } from 'firebase/database';
import { user } from '../interfaces/userInterface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  dataUsers: any;
  constructor(  private database: Database,
                private toast: ToastrService ) { }

  async crearUsuario( value: user ){
    await set( ref( this.database, 'users/' + value.telefono ), value );
    this.toast.success("Usuario creado correctamente");
  }

  obtenerUsuarios(){

    const starCountRef = ref(this.database, 'users/');
    return starCountRef;
  };



  async actualizarUsuario( value: user , path: string){
    await update( ref( this.database, 'users/' + path  ), value );
    this.toast.success("Usuario actualizado correctamente");
  }


  async deleteUser( path: string ){
    await remove( ref( this.database, 'users/' + path ) );
    this.toast.success("Usuario eliminado correctamente")
  }
};
