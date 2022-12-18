import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: `./signin.component.html`,
  styles: [`h1 { font-family: Lato; }`]
})
export class SignInComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private fbs: FirebaseService) {

  }

  signIn() {
    this.fbs.signIn(this.email, this.password);
  }

  signUp() {
    this.router.navigate(['register-user']);
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}
