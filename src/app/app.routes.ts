import { WebcamComponent } from './webcam/webcam.component';
import { BudgetComponent } from './budget/budget.component';
import { PlacesComponent } from './places/places.component';
import { PeopleComponent } from './people/people.component';
import { OrdersComponent } from './orders/orders.component';

import { Routes } from '@angular/router';

export  const AppRoutes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'webcam', component: WebcamComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];
