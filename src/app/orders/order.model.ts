import { OrderItem } from './order-list/order-item/order-item.model';

export class Order {

  constructor(
    public items: OrderItem[],
    public date: Date,
    public delivery: string,
    public sum: number,
    public place: string
  ) {}
}
