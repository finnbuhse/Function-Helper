import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service';

@Component({
  selector: 'signup',
  templateUrl: `./signup.component.html`,
  styleUrls: []
})
export class SignUpComponent {
  email: string = "";
  password: string = "";
  username: string = "";

  constructor(private fbs: FirebaseService) {

  }

  signUp() {
    this.fbs.signUp(this.email, this.password);
  }
}
