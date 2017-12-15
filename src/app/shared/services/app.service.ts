import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AppService {
  private user = {email: ''};
  private admins = [
    'petropo@playbuzz.com',
    'petro.pokydko@gmail.com',
    'opiskozub@gmail.com'
  ];

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.user = firebase.auth().currentUser;
  }

  getCurrentUser() {
    return this.user;
  }

  isAdmin() {
    return this.admins.find(a => a === this.user.email) ? true : false;
  }

  isPbUser() {
    return this.user.email.endsWith('@playbuzz.com') ||
      this.user.email.endsWith('opiskozub@gmail.com');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
