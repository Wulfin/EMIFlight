import {Airport} from "./airport";
import {Day} from "./day";
import {Plane} from "./plane";
import {Terminal} from "./terminal";

export interface FlightGeneric {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureHour: string;
  arrivalHour: string;
  basePrice: number;
  day: Day;
  plane: Plane;
  departureTerminal: Terminal;
  arrivalTerminal: Terminal;
}
