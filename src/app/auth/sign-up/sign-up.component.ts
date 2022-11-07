import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';
import { AuthService } from '../../services/auth.service';
import { user } from '../../interfaces/userInterface';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent implements OnInit {
  registerUser : FormGroup;
  loading : boolean = false;

  constructor(
    private fb      : FormBuilder,
    private afAuth  : AngularFireAuth,
    private toastr  : ToastrService,
    private router  : Router,
    private FireBaseErrorService : FirebaseErrorService,
    private authServ: AuthService,
  ) {

    this.registerUser = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ] ],
      repeatPassword : ['', Validators.required],
    })
  }



  ngOnInit(): void {
  }




  signUp() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;


    if( !this.registerUser.controls['password'].valid ){
      this.toastr.error('The password must have at least one special character ( $@$!%*?& ), one uppercase letter, one number and at least eight characters')
      return;
    }

    if (password != repeatPassword) {
      this.toastr.error('Passwords must be the same', 'Error')
      return;
    }



    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(( user ) => {
      this.loading = false;
      this.toastr.success('The user has been successfully registered!', 'Registered User');
      
      this.sendEmailVerification( user.user );

    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.FireBaseErrorService.codeError(error.code), 'Error')
    })
  }



  
  sendEmailVerification( user: any ){
    user.sendEmailVerification().then( ( res: any ) =>{
      this.toastr.info('We have sent you a verification email, please check it before logging in', 'Verify Mail')
      this.router.navigate(['/login'])
    })
    .catch( (err: any) =>{
      this.toastr.error("Error sending verification email, please try again", 'Verify Mail error')
     })
  }

}
