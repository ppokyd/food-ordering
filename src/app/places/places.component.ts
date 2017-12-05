import { AppService } from './../shared/services/app.service';
import { PlacesService } from './../shared/services/places.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  public name = '';
  public link = '';
  public list: any[];
  public adminMode = false;

  constructor(
    private appService: AppService,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.adminMode = this.appService.isAdmin();
    this.placesService.getPlaces().subscribe(res => {
      this.list = res;
    });
  }

  addPlace() {
    this.placesService.addPlace(this.name);
  }

  openLink(link) {
    const a = <HTMLAnchorElement>document.createElement('A');
    a.target = '_blank';
    a.href = link;
    document.body.appendChild(a);
    a.click();
  }
}
