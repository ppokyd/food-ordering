import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AppService {
  private user = {email: ''};

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.user = firebase.auth().currentUser;
  }

  getCurrentUser() {
    return this.user;
  }

  isAdmin() {
    return this.user.email.startsWith('petropo');
  }

  isPbUser() {
    return (this.user.email.endsWith('@playbuzz.com') ||
      this.user.email.startsWith('opiskozub'));
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
