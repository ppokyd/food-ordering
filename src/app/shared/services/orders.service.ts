import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdersService {
  ordersRef: AngularFireList<any>;
  orders: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.ordersRef = db.list('orders');
    this.orders = this.ordersRef.snapshotChanges();
  }

  getOrders() {
    return this.orders.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .sort((a, b) => b.date - a.date);
    });
  }

  addOrder(order) {
    this.ordersRef.push(order);
  }

  updateOrder(key, order) {
    this.ordersRef.update(key, order);
  }

  removeOrder(key) {
    this.ordersRef.remove(key);
  }
}
