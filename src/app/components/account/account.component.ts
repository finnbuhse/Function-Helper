import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service';
import { User } from 'src/app/shared/firebase/user';

@Component({
  selector: 'account',
  templateUrl: `./account.component.html`,
  styleUrls: []
})
export class AccountComponent implements OnInit
{
  user: User = {
    uid: "loading",
    email: "loading",
    displayName: "loading",
    photoURL: "",
    emailVerified: false
  };

  editUsername: boolean = false;
  newUsername: string = "";

  constructor(private fbs: FirebaseService) { }

  ngOnInit()
  {
    this.user = this.fbs.getUserData();
  }

  changeUsername()
  {
    this.fbs.changeDisplayName(this.newUsername);
    this.user = this.fbs.userData;
  }
}
