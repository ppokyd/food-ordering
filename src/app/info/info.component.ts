import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/services/info.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public infos: Observable<any>;

  constructor(
    private infoService: InfoService
  ) { }

  ngOnInit() {
    this.infos = this.infoService.getInfos();
    // this.infoService.addInfo({label: '', login: '', pass: '' });
  }

}
