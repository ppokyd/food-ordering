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

  logout() {
    this.afAuth.auth.signOut();
  }
}
