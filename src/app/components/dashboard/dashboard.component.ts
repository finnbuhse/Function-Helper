import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: `./dashboard.component.html`,
  styleUrls: []
})
export class DashboardComponent implements OnInit
{
  signedIn: boolean = false;

  constructor(private fbs: FirebaseService) {}

  ngOnInit()
  {
    this.signedIn = this.fbs.isLoggedIn;
  }
}
