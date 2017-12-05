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
}
