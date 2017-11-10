import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.model';
import { Order } from '../../order.model';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  providers: [ OrderItemService ]
})
export class OrderItemComponent implements OnInit {
  orderRef: AngularFireObject<Order>;
  state = 'add';
  user: any;
  @Input() order: any;
  @Output() onEditOrder = new EventEmitter();
  @Output() onDeleteOrder = new EventEmitter();
  orderItem: OrderItem = {
    person: '', link: '', meal: '', drink: '', ready: false
  };

  constructor(
    private db: AngularFireDatabase,
    private service: OrderItemService
  ) {

  }

  ngOnInit() {
    this.orderRef = this.db.object('/orders/' + this.order.key);
    this.orderRef.valueChanges().subscribe(order => {
      this.order = order;
      this.order.items = this.order.items || [];
    });
    this.user = firebase.auth().currentUser;
    this.orderItem.person = this.user.displayName;
  }

  addOrderRow() {
    this.order.items.push(this.orderItem);
    this.orderRef.update(this.order);
    this.orderItem = Object.assign({person: this.user.displayName}, {
      link: '', meal: '', drink: '', ready: false
    });
  }

  updateOrderRow(index) {
    this.service.updateRow(this.order.key, index, this.orderItem);
    this.orderItem = Object.assign({person: this.user.displayName}, {
      link: '', meal: '', drink: '', ready: false
    });
    this.state = 'add';
  }

  editOrderRow(row) {
    this.orderItem = Object.assign({}, row);
    this.state = 'edit';
  }

  deleteOrderRow(index) {
    this.service.removeRow(this.order.key, index);
  }

  changeRowState(row) {
    row.ready = !row.ready;
    this.orderRef.update(this.order);
  }

  editOrder(order) {
    this.onEditOrder.emit(order);
  }

  deleteOrder(order) {
    this.onDeleteOrder.emit(order);
  }
}
