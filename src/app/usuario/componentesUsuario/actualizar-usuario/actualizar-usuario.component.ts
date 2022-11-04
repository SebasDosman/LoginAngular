import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/userInterface';
import { DbServiceService } from 'src/app/services/db-service.service';

import { onValue } from '@angular/fire/database';
import { Route, Router } from '@angular/router';
import { LocalhostService } from '../../../services/localhost.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  usuariosActivos: user[];
  constructor(  private dbServ    : DbServiceService,
                private router    : Router,
                private localStorServ : LocalhostService  ) {
    
   }
  
  
  ngOnInit(): void {
    this.obtenerDataDb();
  }

  obtenerDataDb(){

    const starCountRef = this.dbServ.obtenerUsuarios();

    onValue( starCountRef, (snapshot) => {
      const data =  snapshot.val();
      this.asignarValoresUsuariosActivos( data );
    });
  }


  asignarValoresUsuariosActivos( data: user[] ){
   
    if( data != null ){

      const valoresData = Object.values( data );
      this.usuariosActivos = valoresData;
    }
  }


  editarUsuario( index: number ){
    
    this.localStorServ.añadirUsuarioLocalStorage( this.usuariosActivos[index] );
    this.router.navigateByUrl(`usuario/actualizarUsuario/${ this.usuariosActivos[index].nombre }`);
  }

  
}
