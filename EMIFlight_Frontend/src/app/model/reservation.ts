import {Flight} from "./flight";
import {User} from "./user";
import {AgeGroup} from "./ageGroup";
import {Civility} from "./civility";
import {SeatClass} from "./seatClass";
import {ReservationStatus} from "./reservationStatus";

export class Reservation {
  public id!: string;
  public code!: string;
  public flight: Flight;
  public user!: User;
  public creationDate: string;
  public modificationDate: string;
  public passengerLastName!: string;
  public passengerFirstName!: string;
  public passengerCivility: Civility;
  public passengerAgeGroup: AgeGroup;
  public seatClass: SeatClass;
  public seatNumber!: string;
  public reservationStatus: ReservationStatus;
  public price: number;


  constructor(flight: Flight, creationDate: string, modificationDate: string, passengerCivility: Civility, passengerAgeGroup: AgeGroup, seatClass: SeatClass, reservationStatus: ReservationStatus, price: number, user: User) {
    this.flight = flight;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
    this.passengerCivility = passengerCivility;
    this.passengerAgeGroup = passengerAgeGroup;
    this.seatClass = seatClass;
    this.reservationStatus = reservationStatus;
    this.price = price;
    this.user = user;
  }
}

