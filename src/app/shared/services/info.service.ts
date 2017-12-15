import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InfoService {
  infosRef: AngularFireList<any>;
  infos: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.infosRef = db.list('infos');
    this.infos = this.infosRef.snapshotChanges();
  }

  getInfos() {
    return this.infos.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addInfo(info) {
    this.infosRef.push(info);
  }
}
