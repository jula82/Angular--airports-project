import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../shared/models/flight.model';
import { faAngleDoubleRight, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit, OnDestroy, AfterViewInit{
  flights_list : Flight[] = [];
  flight!: Flight;
  counter : number = 0;
  arrow = faAngleDoubleRight;
  arrowExchange = faExchangeAlt;

  reservationPage : boolean = false;
  subscription: Subscription = new Subscription();
  isAuthenticated: boolean = false;
  subUser?: Subscription;
  activeElement: number = 0;
  notCheckedStatus: boolean = false;

  constructor(private flightsService : FlightsService, private router: Router, private messageService: MessageService, private authService: AuthService) {

    if (this.router.url === '/flights') {
      this.flight = this.flightsService.getFlights()[0];
      this.flights_list = this.flightsService.getFlightsByValues(this.flight);
      this.subscription = this.messageService.getMessage().subscribe(message => {
        this.flight = message;
        this.counter = 0;
        this.flights_list = this.flightsService.getFlightsByValues(this.flight).slice(0,10);
      });
    } else if (this.router.url === '/reservation') {
      this.subscription = this.messageService.getRowSubject().subscribe(row => {
        if(row > 0)
          this.notCheckedStatus = true;
      });
      this.flights_list = this.flightsService.getFlights().slice(0,10);
    }

  }

  ngAfterViewInit(): void {
    if (this.router.url === '/reservation' && !this.notCheckedStatus) {
      this.onSelect(0);
    }
  }

  ngOnInit(): void {
    if (this.router.url === '/flights'){
      this.reservationPage = false;
    } else if (this.router.url === '/reservation') {
      this.reservationPage = true;
    }

    this.subUser = this.flightsService.subUserToFlights.subscribe(status => {
      this.isAuthenticated = <boolean>status;
    });

  }

  getFlights() : Flight[] {
    return this.flights_list;
  }

  getFlightsCount() : number {
    if (this.reservationPage) {
      return this.flightsService.getFlights().length;
    } else {
      return this.flightsService.getFlightsByValues(this.flight).length;
    }
  }


  onLoadMore() : void {
    if(!this.reservationPage) {
      if (this.flightsService.getFlightsByValues(this.flight).length >= this.counter + 10) {
        this.counter += 10;
      } else {
        this.counter += this.flightsService.getFlightsByValues(this.flight).length - this.counter;
      }

      this.flights_list = this.flights_list
                          .concat(this.flightsService.getFlightsByValues(this.flight).slice(this.counter, this.counter + 10));

    } else {
      if (this.flightsService.getFlights().length >= this.counter + 10) {
        this.counter += 10;
      } else {
        this.counter += this.flightsService.getFlights().length - this.counter;
      }

      this.flights_list = this.flights_list
                          .concat(this.flightsService.getFlights().slice(this.counter, this.counter + 10));

    }

  }

  sendToBookingFormComponent(value: Flight, row: number) {
    if (this.isAuthenticated) {
      if (this.reservationPage) {
        this.messageService.sendMessage(value);
      } else if (!this.reservationPage) {
        this.router.navigate(['reservation']);
        this.messageService.sendBehaviourSubject(value, row);
      }
    }
  }

  onSelect(i: number) {
    var elementToRemoveClass = document.getElementsByClassName('rowToHighlight')[this.activeElement];
    elementToRemoveClass.classList.remove("active-row");
    var element = document.getElementsByClassName('rowToHighlight')[i];
    this.activeElement = i;
    element.classList.add("active-row");
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
   this.subUser?.unsubscribe();
  }

}
