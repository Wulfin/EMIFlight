import {Plane} from "./plane";
import {SeatClass} from "./seatClass";

export class Seats {
  id: string
  plane: Plane
  seatClass: SeatClass
  numberOfSeats: number


  constructor(id: string, plane: Plane, seatClass: SeatClass, numberOfSeats: number) {
    this.id = id;
    this.plane = plane;
    this.seatClass = seatClass;
    this.numberOfSeats = numberOfSeats;
  }
}
