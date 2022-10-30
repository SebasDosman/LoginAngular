import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';



import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from './firebase-error.service';
import { TwitterAuthProvider, FacebookAuthProvider, GithubAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private router : Router                     ,
                private toastr : ToastrService              ,
                private afAuth : AngularFireAuth            ,
                private FireBaseError : FirebaseErrorService
                ) { }


    signInGoogle(){

      this.signInWithPopUp( new GoogleAuthProvider);
      return false;
    }

    signInTwitter(){
      this.signInWithPopUp( new TwitterAuthProvider );
      return false;
    }

    signInFacebook(){
      this.signInWithPopUp( new FacebookAuthProvider );
      return false;
    }

    signInGithub(){
      this.signInWithPopUp( new GithubAuthProvider );
      return false;
    }


    signInWithPopUp( provider: any ){

      this.afAuth.signInWithPopup( provider )
      .then((user) => {
        this.toastr.success('User has been successfully logged in with Google', 'User registered');
        console.log(user.user);

        this.router.navigateByUrl("/usuario/dashboard");
        localStorage.setItem('token', JSON.stringify(user.user?.uid));
      })
      .catch((error) => {
        this.toastr.error(this.FireBaseError.codeError(error.code), 'Error');
      })
    }
}
