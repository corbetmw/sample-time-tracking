import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}


@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })

  }

  ////// OAuth Methods /////




  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error) );
  }

  
  //// Email/Password Auth ////
  
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    console.log(email + ' ' + password)
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error) );
  }
  
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error) )
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
  
  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
    this.notify.update(error.message, 'error')
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }

    return userRef.set(data)

  }

}
