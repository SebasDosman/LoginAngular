import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../../../interfaces/userInterface';
import { LocalhostService } from '../../../services/localhost.service';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { StorageService } from '../../../services/storage.service';
import { DbServiceService } from '../../../services/db-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-actualizar',
  templateUrl: './user-actualizar.component.html',
  styleUrls: ['./user-actualizar.component.css']
})
export class UserActualizarComponent implements OnInit {

  usuario: user | null;
  $eventos  : any;
  urlImagen: string;

  constructor(  private localStorServ: LocalhostService,
                private router: Router,
                private fb      : FormBuilder     ,
                private storage : Storage         ,
                private storServ: StorageService  ,
                private dbServ  : DbServiceService,
                private authServ: AuthService     ) { }


  ngOnInit(): void {
    this.usuario = this.localStorServ.obtenerUsuarioLocalStorage();
    this.llenarForm();
  }


  ngOnDestroy(): void {
    this.localStorServ.eliminarUsuarioLocalStorage();
  }
  

  onUpload( e: any ){
    this.$eventos = e;
  }


  formularioActualizarUser : FormGroup = this.fb.group({

    nombre      : [ , Validators.required ],
    apellido    : [ , Validators.required ],
    edad        : [ , Validators.required ],
    telefono    : [ , Validators.required ],
    direccion   : [ , Validators.required ],
    password    : [ , Validators.required ],
    imagen      : [ , Validators.required ]
  })



  async actualizarData(){


    if( this.formularioActualizarUser.valid  ){

      if( this.usuario != null  ) {

        await this.subirImagen( this.usuario );        
        const email= this.usuario!.email;

        this.asignarValoresAUsuario();
        await this.dbServ.actualizarUsuario( this.usuario,  email  );
        this.router.navigateByUrl("/usuario/actualizarUsuario");
      }
    }
    
  }
 

  llenarForm(){

    if( this.usuario == null ){
      this.router.navigateByUrl("usuario/actualizarUsuario")
    } else{


      this.formularioActualizarUser.setValue({
        nombre        : this.usuario.nombre,
        apellido      : this.usuario.apellido,
        edad          : this.usuario.edad,
        telefono      : this.usuario.telefono,
        direccion     : this.usuario.direccion,
        password      : this.usuario.password,
        imagen        : "",
      });
    }
  }


  async subirImagen( usuario: user ){

    const file = this.$eventos.target.files[0];
    const imgRef = ref( this.storage, `images/${ file.name }`);
  
    this.storServ.subirImages( imgRef, file );

    this.urlImagen = await this.storServ.getImages( file.name );
  };



  asignarValoresAUsuario(){
    this.usuario!.nombre    = this.formularioActualizarUser.value.nombre    ;
    this.usuario!.apellido  = this.formularioActualizarUser.value.apellido  ;
    this.usuario!.edad      = this.formularioActualizarUser.value.edad      ;
    this.usuario!.telefono  = this.formularioActualizarUser.value.telefono  ;
    this.usuario!.direccion = this.formularioActualizarUser.value.direccion ;
    this.usuario!.password  = this.formularioActualizarUser.value.password  ;
    this.usuario!.imagen    = this.urlImagen;
  }
}
