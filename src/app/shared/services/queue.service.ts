import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QueueService {
  queueRef: AngularFireList<any>;
  queue: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.queueRef = db.list('queue');
    this.queue = this.queueRef.snapshotChanges();
  }

  getQueue() {
    return this.queue.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addPerson(person) {
    this.queueRef.push(Object.assign({
      ordersAmount: 0
    }, person));
  }

  updateLastDelivery(person) {
    person.ordersAmount++;
    person.lastOrdered = +new Date;
    this.queueRef.update(person.key, person);
  }

  suggestDeliveryPerson() {
    return this.queue.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .sort((a, b) => a.ordersAmount - b.ordersAmount)
        .sort((a, b) => a.lastOrdered - b.lastOrdered);
    });
  }

}
