import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase/firebase.auth.service';

@Component({
  selector: 'toolbar',
  templateUrl: `./toolbar.component.html`,
  styleUrls: []
})
export class ToolbarComponent implements OnInit
{
  signedIn: boolean = false;

  constructor(private router: Router, private fbs: FirebaseService) { }

  ngOnInit()
  {
    this.signedIn = this.fbs.isLoggedIn;
  }

  help()
  {
    this.router.navigate(['help']);
  }

  account()
  {
    this.router.navigate(['account']);
  }
}
