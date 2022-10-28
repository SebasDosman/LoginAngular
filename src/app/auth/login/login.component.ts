import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { AuthService } from '../../services/auth.service';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from '@angular/fire/auth';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loading : boolean = false;
  userLogin : FormGroup;

  constructor(
    private afAuth        : AngularFireAuth ,
    private fb            : FormBuilder     ,
    private toastr        : ToastrService   ,
    private router        : Router          ,
    private FireBaseError : FirebaseErrorService,
    private authServ      : AuthService
  ) {
    this.userLogin = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {

    console.log("easter egg")
  }

  signIn() {
    const email     = this.userLogin.value.email    ;
    const password  = this.userLogin.value.password ;

    

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      
      this.loading = false;
      this.router.navigate(['/usuario/dashboard'])
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error');
      this.loading = false;
    })
  }

  signInWithGoogle() {
    this.loading = true;
    this.loading = this.authServ.signInGoogle( );
  }

  signInWithFacebook() {
    this.loading = true;
    this.loading = this.authServ.signInFacebook( );
  }

  signInWithTwitter() {
    this.loading = true;
    this.loading = this.authServ.signInTwitter();
  }

  signInWithGithub() {
    this.loading = true;
    this.loading = this.authServ.signInGithub();
  }
}
