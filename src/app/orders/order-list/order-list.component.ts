import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  items: Observable<any[]>;
  order: Order = {
    items: [], delivery: '', place: '', date: new Date, sum: 0
  };

  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
  }

  addOrder() {
    this.orders.push(new Order(
      this.order.items, this.order.date, this.order.delivery, this.order.sum, this.order.place
    ));
    this.order = { items: [], delivery: '', place: '', date: new Date, sum: 0 };
  }

}
