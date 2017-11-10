import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderItemService {

  constructor(
    private db: AngularFireDatabase
  ) {}

  removeRow(orderKey, index) {
    this.db.object(`/orders/${orderKey}/items/${index}`)
      .remove();
  }

  updateRow(orderKey, index, data) {
    this.db.object(`/orders/${orderKey}/items/${index}`)
      .update(data);
  }
}
