import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {

  constructor() {}

  getListOfPlaces() {
    return [
      { value: 'cukor', name: 'Cukor' },
      { value: 'pizzalviv', name: 'PizzaLviv' },
      { value: 'banzai', name: 'Banzai' },
      { value: 'smaki-maki', name: 'Smaki-Maki' }
    ];
  }
}

