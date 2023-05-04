import {FlightGeneric} from "./flightGeneric";
import {FlightStatus} from "./flightStatus";

export class Flight {
  id: string;
  flightGeneric: FlightGeneric;
  departureDate: string;
  isFull: boolean;
  flightStatus: FlightStatus;


  constructor(id: string, flightGeneric: FlightGeneric, departureDate: string, isFull: boolean, flightStatus: FlightStatus) {
    this.id = id;
    this.flightGeneric = flightGeneric;
    this.departureDate = departureDate;
    this.isFull = isFull;
    this.flightStatus = flightStatus;
  }
}
