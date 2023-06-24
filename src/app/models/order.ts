import {Car} from "./rental";

export class Order {
  id: number
  car: Car
  active: boolean
  dateFrom: Date
  dateTo: Date


  constructor(id: number, car: Car, active: boolean, dateFrom: Date, dateTo: Date) {
    this.id = id;
    this.car = car;
    this.active = active;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
