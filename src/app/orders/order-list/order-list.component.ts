import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { OrdersService } from '../orders.service';
import { QueueService } from '../../shared/services/queue.service';

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
    items: [], delivery: '', place: '', date: +new Date, sum: 0, key: '', completed: false
  };
  queue = [];
  places = [];
  state = 'add';

  constructor(
    private db: AngularFireDatabase,
    private ordersService: OrdersService,
    private queueService: QueueService
  ) {
    this.ordersRef = db.list('orders');
    this.orders = this.ordersRef.snapshotChanges().map(changes => {
      return changes
        .map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .sort((a, b) => b.date - a.date);
    });
  }

  ngOnInit() {
    this.places = this.ordersService.getListOfPlaces();
    this.queueService.suggestDeliveryPerson().subscribe(res => {
      this.queue = res;
      this.order.delivery = res[0].name;
    });
  }

  addOrder() {
    delete this.order.key;
    this.ordersRef.push(this.order);
    this.order = { items: [], delivery: '', place: '', date: +new Date, sum: 0, key: '', completed: false };
  }

  updateOrder() {
    this.ordersRef.update(this.order.key, this.order);
    this.state = 'add';
  }

  onEdit(order) {
    this.state = 'edit';
    this.order = order;
  }

  onDelete(order) {
    this.ordersRef.remove(order.key);
  }

  onComplete(order, key) {
    order.completed = true;
    this.ordersRef.update(key, order);
    this.queueService.updateLastDelivery(this.queue.find(q => q.name === order.delivery));
  }
}
