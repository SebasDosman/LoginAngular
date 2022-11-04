import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { StorageService } from '../../../services/storage.service';
import { DbServiceService } from '../../../services/db-service.service';
import { user } from '../../../interfaces/userInterface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  $eventos  : any;
  urlImagen : string;


  constructor(  private fb      : FormBuilder     ,
                private storage : Storage         ,
                private storServ: StorageService  ,
                private dbServ  : DbServiceService,
                private authServ: AuthService     ) { 


                }


  
  
  ngOnInit(): void {
  }

  formularioCrearUser:FormGroup = this.fb.group({

    nombre    : [ , Validators.required ],
    apellido  : [ , Validators.required ],
    edad      : [ , Validators.required ],
    telefono  : [ , Validators.required ],
    direccion : [ , Validators.required ],
    password  : [ , Validators.required ],
    email     : [ , Validators.required ],
    imagen    : [ , Validators.required ]
  })


  async enviarData(){
    
    if( this.formularioCrearUser.valid ){

      let infoUser: user = this.formularioCrearUser.value;
      infoUser.creador = await this.authServ.getCurrentUserEmail();

      this.subirImagen(  infoUser );
    }
  }



  onUpload( e: any ){
    this.$eventos = e;
  }



  async subirImagen( infoUser: user ){

    const file = this.$eventos.target.files[0];
    const imgRef = ref( this.storage, `images/${ file.name }`);
  
    
    this.storServ.subirImages( imgRef, file );
    this.urlImagen = await this.storServ.getImages( file.name );
    this.subirUsuario( infoUser );
  }


  subirUsuario( infoUser: user ){
    
    infoUser.imagen = this.urlImagen;
    this.dbServ.crearUsuario( infoUser );
  };
}
