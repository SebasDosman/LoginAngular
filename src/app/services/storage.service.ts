import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, listAll, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  images      : string[];
  urlTemporal : string;
  constructor( private storage: Storage ) { 
    this.images = [];
  }



  subirImages( imgRef: StorageReference, file: any ){

    uploadBytes ( imgRef, file )
    .then       ( response  => {
      console.log( response );
    })
    .catch      ( err       => console.log( err )     );
    
  }


  async getImages( nombreImagen: string ): Promise<string>{
    const images = ref( this.storage, 'images');

    await listAll( images )
      .then( async response =>{ 

          for( let item of response.items ){

            //Convertimos item que es un objeto con mucha info y lo depuramos hasta obtener el nombre del arvhivo que esta en storage
            //Comparamremos ese nombre con el nombre que mandamos por parametro y devolvemos la url del  storage cuando haye un match
            const pathItem = JSON.stringify( item ).split("/");
            let nombreItem= pathItem[ pathItem.length - 1].split("}")[0];
            nombreItem = nombreItem.substring( 0 , nombreItem.length - 1);

            if( nombreImagen == nombreItem ){

              const url = getDownloadURL( item );
              this.urlTemporal = await url;
              return this.urlTemporal;
            }
          }   
          return this.urlTemporal;
      })
      .catch( err => console.log( err ));  

      return this.urlTemporal;
    }

      

}
