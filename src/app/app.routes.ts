import { WebcamComponent } from './webcam/webcam.component';
import { BudgetComponent } from './budget/budget.component';
import { PlacesComponent } from './places/places.component';
import { PeopleComponent } from './people/people.component';
import { OrdersComponent } from './orders/orders.component';
import { InfoComponent } from './info/info.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

import { Routes } from '@angular/router';

export  const AppRoutes: Routes = [
  { path: 'people', component: PeopleComponent, canActivate: [ AuthGuardService ] },
  { path: 'places', component: PlacesComponent, canActivate: [ AuthGuardService ] },
  { path: 'orders', component: OrdersComponent},
  { path: 'budget', component: BudgetComponent, canActivate: [ AuthGuardService ] },
  { path: 'webcam', component: WebcamComponent, canActivate: [ AuthGuardService ] },
  { path: 'info', component: InfoComponent, canActivate: [ AuthGuardService ] },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];
