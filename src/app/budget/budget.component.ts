import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app.service';
import { BudgetService } from '../shared/services/budget.service';
import { QueueService } from '../shared/services/queue.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  public month = '';
  public amount = 0;
  public months: any[];
  public budget: any[];
  public adminMode = false;

  constructor(
    private appService: AppService,
    private budgetService: BudgetService,
    private queueService: QueueService
  ) { }

  ngOnInit() {
    this.adminMode = this.appService.isAdmin();
    this.months = this.budgetService.getMonths();
    this.budgetService.getBudgets().subscribe(res => {
      this.budget = res;
    });
    this.suggestedBudgetAmount();
  }

  addBudget() {
    this.budgetService.addBudget(this.month, this.amount);
  }

  getMonthName(index) {
    return this.budgetService.getMonthName(index);
  }

  suggestedBudgetAmount() {
    this.queueService.suggestDeliveryPerson().subscribe(res => {
      this.amount = this.budgetService.getPersonQuote() * (res.length - 1);
    });
  }
}
