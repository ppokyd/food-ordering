import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
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
export class OrderItemComponent implements OnInit, OnDestroy {
  orderRef: AngularFireObject<Order>;
  @Output() onEditOrder = new EventEmitter();
  @Output() onDeleteOrder = new EventEmitter();
  @Output() onMarkCompleted = new EventEmitter();
  @Input() key: any;
  state = 'add';
  collapsed = true;
  user: any;
  order: any;
  editingIndex: any;
  sub: any;
  orderItem: OrderItem = {
    person: '', link: '', meal: '', drink: '', ready: false
  };

  constructor(
    private db: AngularFireDatabase,
    private service: OrderItemService
  ) {
    this.order = {};
  }

  ngOnInit() {
    this.orderRef = this.db.object('/orders/' + this.key);
    this.sub = this.orderRef.valueChanges().subscribe(order => {
      this.order = order;
    });
    this.user = firebase.auth().currentUser;
    this.orderItem.person = this.user.displayName;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addOrderRow() {
    const index = (this.order.items || []).length;
    this.service.updateRow(this.key, index || 0, this.orderItem);
    this.orderItem = Object.assign({person: this.user.displayName}, {
      link: '', meal: '', drink: '', ready: false
    });
  }

  updateOrderRow() {
    this.service.updateRow(this.key, this.editingIndex, this.orderItem);
    this.orderItem = Object.assign({person: this.user.displayName}, {
      link: '', meal: '', drink: '', ready: false
    });
    this.editingIndex = null;
    this.state = 'add';
  }

  editOrderRow(row, index) {
    this.orderItem = Object.assign({}, row);
    this.editingIndex = index;
    this.state = 'edit';
  }

  deleteOrderRow(index) {
    this.service.removeRow(this.key, index);
  }

  changeRowState(row) {
    row.ready = !row.ready;
    this.orderRef.update(this.order);
  }

  markCompleted(order) {
    this.onMarkCompleted.emit(order);
  }

  editOrder(order) {
    this.onEditOrder.emit(order);
  }

  deleteOrder(order) {
    this.onDeleteOrder.emit(order);
  }
}
