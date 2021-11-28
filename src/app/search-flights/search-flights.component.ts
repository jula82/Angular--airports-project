import { Component, OnInit } from '@angular/core';
import { DateParseService } from '../date-parse.service';
import { Flight } from '../shared/models/flight.model';
import { FlightsService } from '../flights.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
  fromDateTime: Date = new Date();
  toDateTime: Date = new Date(2021,2,24);
  fromAirport :string = 'Warszawa Okęcie (WAW)';
  toAirport : string = 'Lublin Świdnik (LUZ)';

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
  constructor(private message: MessageService, private flightService: FlightsService, private parseDate: DateParseService) { 
    
  }

  ngOnInit(): void {
    this.searchFlights();
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

  searchFlights() {
    let flight = new Flight(this.flightService.getAirport(this.fromAirport), this.flightService.getAirport(this.toAirport), this.parseDate.getDateStringFromFullDate(this.fromDateTime), 
                        this.parseDate.getTimeStringFromFullDate(this.fromDateTime), this.parseDate.getDateStringFromFullDate(this.toDateTime), 
                        this.parseDate.getTimeStringFromFullDate(this.toDateTime));

    this.message.sendMessage(flight);
  }


}
