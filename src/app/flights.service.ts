import { Injectable } from '@angular/core';
import flights from './flights-list/flights.json';
import { Flight } from './shared/models/flight.model';
import { DateParseService } from './date-parse.service';
import { Airport } from './shared/models/airport.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class FlightsService {
  flights_list : Flight[] = flights;
  public subUserToFlights: BehaviorSubject<any> = new BehaviorSubject<any>("");

  constructor(private dateParse: DateParseService) { }

  getFlights() : Flight[]{
    return this.flights_list; 
  }

  getFlightsByValues(flight: Flight) : Flight[]{
    let list = [];
    list = this.flights_list.filter((flightObj: Flight) => {
      if ((flight.from.code === flightObj.from.code) &&
          (flight.to.code === flightObj.to.code) &&
          (flight.date === flightObj.date) &&
          (flight.dateTo === flightObj.dateTo)
          ) {
            if(this.dateParse.isDateInRange(flight.date, flight.time, flightObj.date, flightObj.time))
               return flightObj;
          }
      return undefined;
    });

    return list;
  }

   getAirport(value: string) : Airport {
     let result1 = value.split("( ")[0].trim();
     let result2 = value.split("(")[1];
     let airport = new Airport(result1, result2.split(")")[0]);
     return airport;
   }

   sendAuthenticationStatus(status: boolean){
    this.subUserToFlights.next(status);
   }

  
}
