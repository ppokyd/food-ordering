import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../shared/services/budget.service';
import { OrdersService } from '../../shared/services/orders.service';

@Component({
  selector: 'app-orders-budget',
  templateUrl: './orders-budget.component.html',
  styleUrls: ['./orders-budget.component.css']
})
export class OrdersBudgetComponent implements OnInit {
  public monthName = '';
  public budget = {amount: 0};
  public leftAmount = 0;

  constructor(
    private budgetService: BudgetService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.monthName = this.budgetService.getMonthName();
    this.getCurrentBudget();
  }

  getCurrentBudget() {
    this.budgetService.getBudgets().subscribe(res => {
      if (res) {
        const month = this.budgetService.getCurrentMonthIndex();
        const year = this.budgetService.getCurrentYearIndex();
        this.budget = res.find(b => b.month === month && b.year === year);
        this.calcLeftAmount();
      }
    });
  }

  calcLeftAmount() {
    this.ordersService.getOrders().subscribe(res => {
      this.leftAmount = this.budget.amount - this.ordersService.calcThisSum(res);
    });
  }
}
