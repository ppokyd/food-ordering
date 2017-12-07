import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlacesService {
  placesRef: AngularFireList<any>;
  places: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.placesRef = db.list('places');
    this.places = this.placesRef.snapshotChanges();
  }

  getPlaces() {
    return this.places.map(val => {
      return val.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  addPlace(name, link) {
    const value = name.toLowerCase().replace(/[^\w\s]/gi, '') || +new Date;
    this.placesRef.push({name, link, value, orderAmount: 0});
  }

  updatePlaceOrders(placeName) {
    this.getPlaces().subscribe(res => {
      const place = res.find(p => p.name === placeName);
      place.orderAmount++;
      this.placesRef.update(place.key, place);
    });
  }
}
