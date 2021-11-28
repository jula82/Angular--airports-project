import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartContentService } from 'src/app/cart-content.service';
import { CartComponent } from 'src/app/cart/cart.component';
import { DateParseService } from 'src/app/date-parse.service';
import { Flight } from 'src/app/shared/models/flight.model';
import { FlightsService } from 'src/app/flights.service';
import { MessageService } from 'src/app/message.service';
import { ReservationDetails } from 'src/app/shared/models/reservationDetails.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit, OnDestroy {
  chosenRow: Flight;
  @Output() rowEmit = new EventEmitter<Flight>();
  subscription: Subscription = new Subscription();
  subscriptionPage: Subscription = new Subscription();

  airplaneClass : string = "Pierwsza";
  airplaneClasses : string[] = [
    "Pierwsza",
    "Biznesowa",
    "Ekonomiczna"
  ];

  fromAirport :string;
  toAirport : string;
  airports = [
    "Warszawa Okęcie (WAW)",
    "Bydgoszcz-Szwederowo (BDG)",
    "Gdańsk Rębiechowo (GDN)",
    "Poznań-Ławica (PZN)",
    "Kraków-Balice (KRK)",
    "Katowice-Pyrzowice (KTW)",
    "Warszawa-Modlin (WMI)",
    "Lublin Świdnik (LUZ)",
    "Wrocław-Strachowice (WRO)",
    "Jasionka (RZE)",
    "Szczecin-Goleniów (SZZ)",
    "Łódź-Lublinek (LCJ)",
    "Szymany (SZY)",
    "Nowe Kramsko (IEG)",
    "Radom, Sadków(RDO)"
  ];
  settings = {
    bigBanner : true,
    timePicker: true,
    format: 'dd-MM-yyyy, hh:mm a',
    defaultOpen: false,
    closeOnSubject: false
  };

  dateTo: Date;
  date: Date;
  fullName: string = '';
  name: string = '';
  
  constructor(private messageService: MessageService, private flightsService : FlightsService, private parseDate: DateParseService, private cartContent: CartContentService) { 
    this.chosenRow = this.flightsService.getFlights()[0];
    this.toAirport = this.chosenRow.to.name + " (" + this.chosenRow.to.code +")";
    this.fromAirport = this.chosenRow.from.name + " (" + this.chosenRow.from.code +")";
    this.dateTo = parseDate.getFullDate(this.chosenRow.dateTo, this.chosenRow.timeTo);
    this.date = parseDate.getFullDate(this.chosenRow.date, this.chosenRow.time);

    this.rowEmit.emit(this.chosenRow);
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.toAirport = message.to.name + " (" + message.to.code +")";
        this.fromAirport = message.from.name + " (" + message.from.code +")";
        this.dateTo = parseDate.getFullDate(message.dateTo, message.timeTo);
        this.date = parseDate.getFullDate(message.date, message.time);
        this.rowEmit.emit(message)
      }
    });

    this.subscriptionPage = this.messageService.getBehaviourSubject().subscribe(message => {
      if (message) {
        this.toAirport = message.to.name + " (" + message.to.code +")";
        this.fromAirport = message.from.name + " (" + message.from.code +")";
        this.dateTo = parseDate.getFullDate(message.dateTo, message.timeTo);
        this.date = parseDate.getFullDate(message.date, message.time);
        this.rowEmit.emit(message)
      }
    });
  }

  ngOnInit(): void {
  }

  getAirports(airport : string) : string[]{
    if (airport === "toAirport") {
      return this.airports.filter(element => {
        return element != this.toAirport;
      });
    } else if (airport === "fromAirport") {
      return this.airports.filter(element => {
        return element != this.fromAirport;
      });
    }
    return this.airports;
  }

  onSubmit(form: NgForm) {
    let reservation = new ReservationDetails(form.controls.date.value, form.controls.dateTo.value, form.controls.fromAirport.value, form.controls.toAirport.value,
      form.controls.name.value, form.controls.lastName.value, form.controls.peopleAmount.value, form.controls.airplaneClass.value)
    this.cartContent.addToCart(reservation);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }

}
