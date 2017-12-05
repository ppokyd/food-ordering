import { AppService } from './../shared/services/app.service';
import { QueueService } from './../shared/services/queue.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  public name = '';
  public list: any[];
  public adminMode = false;

  constructor(
    private appService: AppService,
    private queueService: QueueService
  ) { }

  ngOnInit() {
    this.queueService.getQueue().subscribe(res => {
      this.list = res;
    });
    this.adminMode = this.appService.isAdmin();
  }

  addPerson() {
    this.queueService.addPerson(this.name);
  }

}
