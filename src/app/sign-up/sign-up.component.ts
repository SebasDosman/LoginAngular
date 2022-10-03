import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent implements OnInit {
  // user : SocialUser;
  // loggedIn : boolean;

  constructor(private authService : SocialAuthService) {
  }

  ngOnInit() : void {
    // throw new Error('Method not implemented.');
  }

  // ngOnInit() {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //   });
  // }

  signInWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => console.log("correcto"))
    .catch((err) => {
      console.log("Error: ", err);
    });
  }

  signInWithFB() : void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut() : void {
    this.authService.signOut();
  }
}
