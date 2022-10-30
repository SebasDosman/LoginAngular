import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  dataUser : any;

  constructor( private afauth : AngularFireAuth, private router : Router) { }


  ngOnInit(): void {

    this.mostrarDataUsuario();
  }


  mostrarDataUsuario(){

    this.afauth.currentUser.then( (user: any) => {
      
      console.log( user );
      if( user ){
        
        this.dataUser = user;
        console.log( this.dataUser.email )
      }
    })
  }


  signOut(){
    this.afauth.signOut();
  }
}
