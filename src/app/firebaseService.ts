import { Injectable, OnInit } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCajsw1DN4lzSpJJkfUrOUdKmEbZl66f4",
  authDomain: "function-helper.firebaseapp.com",
  databaseURL: "https://function-helper.eur3.firebaseio.com",
  projectId: "function-helper",
  storageBucket: "function-helper.appspot.com",
  messagingSenderId: "278533435669",
  appId: "1:278533435669:web:1f54b8bc463f36b3e3791c",
  measurementId: "G-F7MXM13S6S",
};

const environment = {
  production: false,
  firebase: firebaseConfig
}

@Injectable({
  imports: [ AngularFireModule ]
}) // Defines 'singleton' like behaviour.
export class FirebaseService implements OnInit
{

 
  ngOnInit()
  {

  }
}
