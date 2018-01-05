import * as moment from 'moment';

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

  calcTotalSum(res) {
    return res.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }

  calcThisSum(res) {
    const curMonth = moment().get('month');
    const curRes = res.filter(i => moment(i.date).get('month') === curMonth);
    return curRes.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }

  calcPrevSum(res) {
    let prevMonth = moment().get('month') - 1;
    if (prevMonth < 0) {
      prevMonth = 11;
    }
    const prevRes = res.filter(i => moment(i.date).get('month') === prevMonth);
    return prevRes.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }
}
