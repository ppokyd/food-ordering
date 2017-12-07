import { PlacesComponent } from './places/places.component';
import { PeopleComponent } from './people/people.component';
import { OrdersComponent } from './orders/orders.component';
import { Routes } from '@angular/router';

export  const AppRoutes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];
