import * as moment from 'moment';

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
      this.calcTotalSumm(res);
      this.calcThisSumm(res);
      this.calcPrevSumm(res);
    });
  }

  calcTotalSumm(res) {
    this.totalSumm = res.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }

  calcThisSumm(res) {
    const curMonth = moment().get('month');
    const curRes = res.filter(i => moment(i.date).get('month') === curMonth);
    this.thisSumm = curRes.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }

  calcPrevSumm(res) {
    let prevMonth = moment().get('month') - 1;
    if (prevMonth < 0) {
      prevMonth = 12;
    }
    console.log(prevMonth);
    const prevRes = res.filter(i => moment(i.date).get('month') === prevMonth);
    this.prevSumm = prevRes.reduce((s, a) => s + parseInt(a.sum, 10), 0);
  }

}
