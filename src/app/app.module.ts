import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookingComponent } from './booking/booking.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { FlightsComponent } from './flights/flights.component';
import { BookingFormComponent } from './booking/booking-form/booking-form.component';
import { AmountPeopleValidationDirective } from './amount-people-validation.directive';
import { MessageService } from './message.service';
import { DateParseService } from './date-parse.service';
import { FlightsService } from './flights.service';
import { CartContentService } from './cart-content.service';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    SearchFlightsComponent,
    BookingComponent,
    FlightsListComponent,
    FooterComponent,
    FlightsComponent,
    BookingFormComponent,
    AmountPeopleValidationDirective,
    AuthComponent,
    LoadingComponent
  ],
  imports: [
    NgbModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    AngularDateTimePickerModule, FontAwesomeModule,
  ],
  providers: [MessageService, DateParseService, FlightsService, CartContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
