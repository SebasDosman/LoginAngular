import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../services/firebase-error.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  resetPassword : FormGroup;
  loading : boolean = false;

  constructor(
    private afAuth : AngularFireAuth,
    private fb : FormBuilder,
    private toastr : ToastrService,
    private router : Router,
    private FireBaseError : FirebaseErrorService
  ) {

    this.resetPassword = this.fb.group({
      email : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  reset() {
    const email = this.resetPassword .value.email;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('We have sent you an email to reset your password', 'Recover Password')
      
      this.router.navigate(['/auth/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
    })
  }
}
