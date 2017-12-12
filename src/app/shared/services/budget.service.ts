import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BudgetService {
  budgetsRef: AngularFireList<any>;
  budgets: Observable<any[]>;

  private personQuote = 70 * 27;

  private months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  constructor(
    private db: AngularFireDatabase
  ) {
    this.budgetsRef = db.list('budgets');
    this.budgets = this.budgetsRef.snapshotChanges();
  }

  getBudgets() {
    return this.budgets.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getPersonQuote() {
    return this.personQuote;
  }

  getMonths() {
    return this.months;
  }

  getCurrentMonthIndex() {
    return new Date().getMonth();
  }

  getCurrentYearIndex() {
    return new Date().getFullYear();
  }

  getMonthName(index = this.getCurrentMonthIndex()) {
    return this.months[index];
  }

  addBudget(month, amount) {
    this.budgetsRef.push({month, amount, year: this.getCurrentYearIndex()});
  }
}
