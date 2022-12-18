// Credit to Digamber for authentication tutorial at https://www.positronx.io/full-angular-firebase-authentication-system/ 

import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as fireauth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

import { User } from './user';

@Injectable()
export class FirebaseService {
  userData: any;

  constructor(private router: Router, private auth: AngularFireAuth, private db: AngularFirestore) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['dashboard']);
          this.setUserData(result.user);
        }
      });
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then((result) => {
      this.sendVerificationMail();
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  sendVerificationMail() {
    return this.auth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  googleAuth() {
    return this.authLogin(new fireauth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  /* Sign in via third party. */
  authLogin(provider: any) {
    return this.auth.signInWithPopup(provider).then((result) => {
      this.router.navigate(['dashboard']);
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
