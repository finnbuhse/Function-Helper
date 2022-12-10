import { Injectable, OnInit } from "@angular/core";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

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

@Injectable() // Defines 'singleton' like behaviour.
export class FirebaseService implements OnInit
{
  app = initializeApp(firebaseConfig);

  db = getFirestore(this.app);
 
  ngOnInit()
  {

  }
}
