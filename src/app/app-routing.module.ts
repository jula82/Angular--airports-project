import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { BookingComponent } from './booking/booking.component';
import { CartComponent } from './cart/cart.component';
import { FlightsComponent } from './flights/flights.component';

const routes: Routes = [
  {path: '', redirectTo: '/flights', pathMatch: 'full'},
  {path: 'flights', component: FlightsComponent, data: {message: false}},
  {path: 'reservation', component: BookingComponent},
  {path: 'cart', component: CartComponent},
  {path: 'auth', component: AuthComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
