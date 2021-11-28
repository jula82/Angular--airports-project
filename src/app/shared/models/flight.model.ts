import {Airport} from './airport.model'
export class Flight { 
    constructor(
        public from : Airport,
        public to : Airport,
        public date : string,
        public time : string,
        public dateTo : string,
        public timeTo : string
    ){}

   

}