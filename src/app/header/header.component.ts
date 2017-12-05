import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  user: any;

  constructor(
    public appService: AppService
  ) {}

  ngOnInit() {
    this.user = this.appService.getCurrentUser();
  }

  logout() {
    this.appService.logout();
  }
}
