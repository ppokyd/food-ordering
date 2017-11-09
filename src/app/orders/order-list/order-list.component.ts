import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ordersRef: AngularFireList<Order>;
  orders: Observable<Order[]>;
  order: Order = {
    items: [], delivery: '', place: '', date: +new Date, sum: 0
  };

  constructor(db: AngularFireDatabase) {
    this.ordersRef = db.list('orders');
    this.orders = this.ordersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
  }

  addOrder() {
    this.ordersRef.push(this.order);
    this.order = { items: [], delivery: '', place: '', date: +new Date, sum: 0 };
  }

}
