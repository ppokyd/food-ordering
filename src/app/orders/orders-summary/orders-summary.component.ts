import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../shared/services/orders.service';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent implements OnInit {
  totalSumm = 0;
  thisSumm = 0;
  prevSumm = 0;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService.getOrders().subscribe(res => {
      this.totalSumm = this.ordersService.calcTotalSum(res);
      this.thisSumm = this.ordersService.calcThisSum(res);
      this.prevSumm = this.ordersService.calcPrevSum(res);
    });
  }

}
