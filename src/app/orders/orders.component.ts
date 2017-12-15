import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public isPbUser: boolean;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.isPbUser = this.appService.isPbUser();
  }
}
