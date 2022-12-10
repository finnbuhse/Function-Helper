import { Injectable} from "@angular/core";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

@Injectable() // Defines 'singleton' like behaviour.
export class FirebaseService
{
  firebaseConfig = {
    apiKey: "AIzaSyBCajsw1DN4lzSpJJkfUrOUdKmEbZl66f4",
    authDomain: "function-helper.firebaseapp.com",
    //databaseURL: "https://function-helper.firebaseio.com",
    projectId: "function-helper",
    storageBucket: "function-helper.appspot.com",
    messagingSenderId: "278533435669",
    appId: "1:278533435669:web:1f54b8bc463f36b3e3791c",
    measurementId: "G-F7MXM13S6S",
  };

  app = initializeApp(this.firebaseConfig);

  firestore;

  constructor()
  {
    this.firestore = getFirestore(this.app);
  }
}