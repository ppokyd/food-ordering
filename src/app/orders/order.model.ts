import { OrderItem } from './order-list/order-item/order-item.model';

export class Order {

  constructor(
    public items: OrderItem[],
    public date: number,
    public delivery: string,
    public sum: number,
    public place: string,
    public key: string
  ) {}
}
