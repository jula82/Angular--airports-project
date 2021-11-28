import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy{

  constructor() { 
    
  }

  ngOnInit(): void {
    document.body.className = "selector";
  }

  ngOnDestroy() {
    document.body.classList.remove("selector");
  }

}
