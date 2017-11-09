import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from './order-item.model';
import { Order } from '../../order.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  user: any;
  @Input() order: Order;
  orderItem: OrderItem = {
    person: '', link: '', meal: '', drink: '', ready: false
  };

  constructor() { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.orderItem.person = this.user.displayName;
  }

  addRow() {
    this.order.items.push(new OrderItem(
      this.orderItem.person, this.orderItem.link, this.orderItem.meal, this.orderItem.drink, false
    ));
    this.orderItem = Object.assign({person: this.user.displayName}, {
      link: '', meal: '', drink: '', ready: false
    });
  }

  editOrder(order) {

  }
}
