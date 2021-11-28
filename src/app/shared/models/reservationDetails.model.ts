import { Airport } from "./airport.model";

export class ReservationDetails { 
    constructor(
        public dateStart : Date,
        public dateEnd: Date,
        public fromAirport: Airport,
        public toAirport: Airport,
        public name : string,
        public lastName: string,
        public peopleAmount: number,
        public className: string
    ){}
}