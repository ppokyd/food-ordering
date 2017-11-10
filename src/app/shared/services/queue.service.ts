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
    this.queue = this.queueRef.valueChanges();
  }

  getQueue() {
    return this.queue;
  }

  suggestDeliveryPerson() {
    return this.queue.map(val => {
      return val.sort((a, b) => a.ordersAmount - b.ordersAmount);
    });
  }

}
