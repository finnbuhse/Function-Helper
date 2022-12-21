import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service'

@Component({
  selector: 'forgotpassword',
  templateUrl: `./forgotpassword.component.html`,
  styleUrls: []
})
export class ForgotPasswordComponent {
  email: string = "";

  constructor(private fbs: FirebaseService) {

  }

  /* Invoked when password reset button is pressed. */
  forgotPassword() {
    this.fbs.forgotPassword(this.email);
  }
}
