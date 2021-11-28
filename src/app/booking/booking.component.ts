import { Component, OnInit } from '@angular/core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Flight } from '../shared/models/flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  arrowExchange = faExchangeAlt;
  flight: Flight;
  constructor(private flightsService : FlightsService) { 
    this.flight = this.flightsService.getFlights()[0];
  }
   
  ngOnInit(): void {
  }

  updateCodes(flight: Flight) {
    this.flight = flight;
  }

}
