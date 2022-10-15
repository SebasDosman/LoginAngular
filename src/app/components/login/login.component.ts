import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading : boolean = false;
  userLogin : FormGroup;

  constructor(
    private afAuth : AngularFireAuth,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private router : Router,
    private FireBaseError : FirebaseErrorService,
  ) {
    this.userLogin = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signIn() {
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.loading = false;
      this.router.navigate(['/'])
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      this.loading = false;
    })
  }

  signInWithGoogle() {
    this.loading = true;

    this.afAuth.signInWithPopup( new GoogleAuthProvider).then((user) => {
      this.loading = false;
      this.toastr.success('User has been successfully logged in with Google', 'User registered');
      this.router.navigate(['/']);
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      this.loading = false;
    })
  }

  signInWithFacebook() {
    this.loading = true;

    this.afAuth.signInWithPopup( new FacebookAuthProvider).then((user) => {
      this.loading = false;
      this.toastr.success('The user has been successfully logged in with Facebook', 'User registered');
      this.router.navigate(['/']);
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      this.loading = false;
    })
  }

  signInWithTwitter() {
    this.loading = true;

    this.afAuth.signInWithPopup( new TwitterAuthProvider).then((user) => {
      this.loading = false;
      this.toastr.success('User has been successfully logged in with Twitter', 'User registered');
      this.router.navigate(['/']);
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      this.loading = false;
    })
  }

  signInWithGithub() {
    this.loading = true;

    this.afAuth.signInWithPopup( new GithubAuthProvider).then((user) => {
      this.loading = false;
      this.toastr.success('User has been successfully logged in with GitHub', 'User registered.');
      this.router.navigate(['/']);
      localStorage.setItem('token', JSON.stringify(user.user?.uid));
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      this.loading = false;
    })
  }
}
