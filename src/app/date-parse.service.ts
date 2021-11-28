import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParseService {

  constructor() { }

  getFullDate(date: string, time: string) {
    let dateArray = date.split("-").map(x => +x);
    let timeArray = time.split(":").map(x => +x);
    let result = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    result.setHours(timeArray[0]);
    result.setMinutes(timeArray[1]);

    return result;
  }

  isDateInRange(date1: string, time1: string, date2: string, time2: string) {
    let dateFirst = this.getFullDate(date1, time1);
    let dateSecond = this.getFullDate(date2, time2);
    if (dateFirst <= dateSecond) {
      return true;
    } else {
      return false;
    }

  }

  getDateStringFromFullDate(date: Date){
    let dateCurrent = new Date(date);
    let day = dateCurrent.getDate() < 10 ? "0" + dateCurrent.getDate().toString(): dateCurrent.getDate().toString();
    let month = (dateCurrent.getMonth() + 1) < 10 ? "0" +  (dateCurrent.getMonth() + 1).toString() : (dateCurrent.getMonth() + 1).toString();
    let year = dateCurrent.getFullYear().toString();

    return day + "-" + month + "-" + year;
  }

  getTimeStringFromFullDate(date: Date){
    let dateCurrent = new Date(date);
    let hour = dateCurrent.getHours() < 10 ? "0" + dateCurrent.getHours().toString(): dateCurrent.getHours().toString();
    let minutes = dateCurrent.getMinutes() < 10 ? "0" + dateCurrent.getMinutes().toString(): dateCurrent.getMinutes().toString();

    return hour + ":" + minutes;
  }

  getFullDateFromDateType(date: Date) {
    return this.getDateStringFromFullDate(date) + ", " + this.getTimeStringFromFullDate(date);
  }

}
