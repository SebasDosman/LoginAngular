import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../../../services/db-service.service'
;
import { Database, set, ref,   onValue } from '@angular/fire/database';
import { user } from '../../../interfaces/userInterface';
@Component({
  selector: 'app-leer-usuario',
  templateUrl: './leer-usuario.component.html',
  styleUrls: ['./leer-usuario.component.css']
})
export class LeerUsuarioComponent implements OnInit {


  usuariosActivos: user[];
  constructor( private dbServ: DbServiceService) {
    
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

}
