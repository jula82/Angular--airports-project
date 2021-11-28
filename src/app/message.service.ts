import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Flight } from './shared/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();
  public data: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private row: BehaviorSubject<any> = new BehaviorSubject<any>("");

  constructor() { }

  sendMessage(message: Flight) {
    this.subject.next(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendBehaviourSubject(message: Flight, row: number) {
    this.data.next(message);
    this.row.next(row);
  }

  getBehaviourSubject(): Observable<any> {
    return this.data.asObservable();
  }

  getRowSubject(): Observable<any> {
    return this.row.asObservable();
  }

}
