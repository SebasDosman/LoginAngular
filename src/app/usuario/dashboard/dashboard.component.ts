import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recarga: number = 0;
  constructor(  private afauth : AngularFireAuth, private router: Router ) { }

  redireccionarSiNoExiste(){
    this.afauth.currentUser.then( (user: any) => {
      if( !user ) this.router.navigate(['/auth']);
    })
  }


  ngOnInit(): void {
    this.redireccionarSiNoExiste();
  }

}
