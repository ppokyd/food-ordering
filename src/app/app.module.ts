import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AppService } from './shared/services/app.service';
import { HeaderComponent } from './header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderItemComponent } from './orders/order-list/order-item/order-item.component';
import { OrdersSummaryComponent } from './orders/orders-summary/orders-summary.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { QueueService } from './shared/services/queue.service';
import { PeopleComponent } from './people/people.component';
import { PlacesComponent } from './places/places.component';
import { PlacesService } from './shared/services/places.service';
import { OrdersService } from './shared/services/orders.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrdersComponent,
    OrdersSummaryComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderItemComponent,
    PeopleComponent,
    PlacesComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      AppRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        useHash: true
      }
    )
  ],
  providers: [
    AngularFireDatabase,
    QueueService,
    AppService,
    PlacesService,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
