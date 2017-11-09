import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  user: any;

  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
