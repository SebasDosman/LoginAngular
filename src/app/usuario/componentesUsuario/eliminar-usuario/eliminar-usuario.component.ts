import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/userInterface';

import { onValue } from '@angular/fire/database';
import { DbServiceService } from '../../../services/db-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  constructor(  private dbServ: DbServiceService,
                private router: Router ) { }


  usuariosActivos: user[];

  ngOnInit(): void {
    this.obtenerDataDb();
  }

  async borrarUsuario( index: number ){
    const usuario = this.usuariosActivos[ index ];
    await this.dbServ.deleteUser( usuario.telefono + "" );

    this.router.navigateByUrl('/usuario', {skipLocationChange: true}).then(()=> this.router.navigate(["/usuario/eliminarUsuario"]));
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
