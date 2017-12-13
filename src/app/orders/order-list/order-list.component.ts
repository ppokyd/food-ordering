import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PlacesService } from './../../shared/services/places.service';
import { QueueService } from '../../shared/services/queue.service';
import { OrdersService } from './../../shared/services/orders.service';

import { Order } from '../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders;
  order: Order = {
    items: [], delivery: '', place: '', date: +new Date, sum: 0, key: '', completed: false
  };
  queue = [];
  places = [];
  state = 'add';
  currentPage = 1;
  filterMonth = 'this_month';

  constructor(
    private db: AngularFireDatabase,
    private placesService: PlacesService,
    private queueService: QueueService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.placesService.getPlaces().subscribe(res => {
      this.places = res;
    });
    this.queueService.suggestDeliveryPerson().subscribe(res => {
      this.queue = res;
      this.order.delivery = res[0].name;
    });

    this.filterOrdersBy(this.filterMonth);
  }

  addOrder() {
    delete this.order.key;
    this.ordersService.addOrder(this.order);
    this.order = { items: [], delivery: '', place: '', date: +new Date, sum: 0, key: '', completed: false };
  }

  updateOrder() {
    this.ordersService.updateOrder(this.order.key, this.order);
    this.state = 'add';
  }

  onEdit(order) {
    this.state = 'edit';
    this.order = order;
  }

  onDelete(order) {
    this.ordersService.removeOrder(order.key);
  }

  onComplete(order, key) {
    order.completed = true;
    this.ordersService.updateOrder(key, order);
    this.placesService.updatePlaceOrders(this.places.find(p => p.name === order.place));
    this.queueService.updateLastDelivery(this.queue.find(q => q.name === order.delivery));
  }

  filterOrdersBy(value) {
    let month = new Date().getMonth();

    this.ordersService.getOrders().subscribe(res => {
      if (value === 'prev_month') {
        if (month === 0) {
          month = 11;
        } else {
          month--;
        }
      } else if (value === 'all') {
        this.orders = res;
        return;
      }

      this.orders = res.filter(o => {
        return new Date(o.date).getMonth() === month;
      });
    });
  }
}
