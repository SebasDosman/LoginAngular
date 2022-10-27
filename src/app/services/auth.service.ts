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

      return this.signInWithPopUp( new GoogleAuthProvider);
    }

    signInTwitter(){
      return this.signInWithPopUp( new TwitterAuthProvider );
    }

    signInFacebook(){
      return  this.signInWithPopUp( new FacebookAuthProvider );
    }

    signInGithub(){
      return this.signInWithPopUp( new GithubAuthProvider );
    }


    signInWithPopUp( provider: any ): any {

      this.afAuth.signInWithPopup( provider )
      .then((user) => {
          this.toastr.success('User has been successfully logged in with Google', 'User registered');
        console.log(user.user);

        localStorage.setItem('token', JSON.stringify(user.user?.uid));
        this.router.navigate(['/usuario/dashboard']);
        return false; 
      })
      .catch((error) => {
        this.toastr.error(this.FireBaseError.codeError(error.code), 'Error');
        return false; 
      })
    }



}
