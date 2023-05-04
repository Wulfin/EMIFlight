import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Reservation} from "../model/reservation";
import {Flight} from "../model/flight";
import {FlightService} from "../service/flight.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Civility} from "../model/civility";
import {AgeGroup} from "../model/ageGroup";
import {SeatClass} from "../model/seatClass";
import {ReservationStatus} from "../model/reservationStatus";
import {ReservationService} from "../service/reservation.service";
import {User} from "../model/user";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  public adultPassengers : Reservation[] = [];
  public childPassengers : Reservation[] = [];
  public adultPassengersReturn : Reservation[] = [];
  public childPassengersReturn : Reservation[] = [];
  public nbOfPassengersAdults !: number;
  public nbOfPassengersChildren !: number;
  public outboundFlight!: Flight;
  public returnFlight!: Flight;
  public checkker: boolean = false;
  public clicked: boolean = false;
  public priceAddition: number = 1;
  public _class: string = "";

  constructor(private route: ActivatedRoute, private flightService: FlightService, private router: Router, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    const outboundFlightId : string = this.route.snapshot.params['outbound-flight-id'];
    const returnFlightId : string = this.route.snapshot.params['return-flight-id'];
    this.nbOfPassengersAdults = parseInt(this.route.snapshot.params['nb-of-passengers-adults']);
    this.nbOfPassengersChildren = parseInt(this.route.snapshot.params['nb-of-passengers-children']);
    this._class = this.route.snapshot.params['class'];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    this.flightService.getFlightById(outboundFlightId).subscribe(
      (response: Flight) => {
        this.outboundFlight = response;

        for(let i = 0; i < this.nbOfPassengersAdults; i++) {
          this.adultPassengers.push(new Reservation(this.outboundFlight, todayDate, todayDate, new Civility(), new AgeGroup("AD"), new SeatClass(this._class), new ReservationStatus("SCHD"), this.outboundFlight.flightGeneric.basePrice, new User("", "", "", "", "", "", "", "", "")));
        }

        for(let i = 0; i < this.nbOfPassengersChildren; i++) {
          this.childPassengers.push(new Reservation(this.outboundFlight, todayDate, todayDate, new Civility(), new AgeGroup("CHD"), new SeatClass(this._class), new ReservationStatus("SCHD"), this.outboundFlight.flightGeneric.basePrice, new User("", "", "", "", "", "", "", "", "")));
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    if(returnFlightId != undefined) {
      this.flightService.getFlightById(returnFlightId).subscribe(
        (response: Flight) => {
          this.returnFlight = response;

          for(let i = 0; i < this.nbOfPassengersAdults; i++) {
            this.adultPassengersReturn.push(new Reservation(this.returnFlight, todayDate, todayDate, new Civility(), new AgeGroup("AD"), new SeatClass(this._class), new ReservationStatus("SCHD"), this.returnFlight.flightGeneric.basePrice, new User("", "", "", "", "", "", "", "", "")));
          }

          for(let i = 0; i < this.nbOfPassengersChildren; i++) {
            this.childPassengersReturn.push(new Reservation(this.returnFlight, todayDate, todayDate, new Civility(), new AgeGroup("CHD"), new SeatClass(this._class), new ReservationStatus("SCHD"), this.returnFlight.flightGeneric.basePrice, new User("", "", "", "", "", "", "", "", "")));
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    if(this._class == "FST")
      this.priceAddition = 7;
    else if(this._class == "BUSI")
      this.priceAddition = 0.8;

    this.priceAddition = this.priceAddition * (this.nbOfPassengersAdults + (this.nbOfPassengersChildren * 0.75))
    this.priceAddition = Number(this.priceAddition.toFixed(0))

    // this.childPassengers = Array.from(Array(parseInt(this.nbOfPassengersChildren)),(x,i)=>i);
  }

  public check(reservations: Reservation[]): boolean {
    this.clicked = true;
    for(let i = 0; i < reservations.length; i++) {
      if((reservations[i].passengerCivility.code == undefined || reservations[i].passengerFirstName == undefined || reservations[i].passengerLastName == undefined) || (reservations[i].passengerCivility.code == '' || reservations[i].passengerFirstName == '' || reservations[i].passengerLastName == '')) {
        this.checkker = false;
        return false;
      }
    }
    this.checkker = true;
    return true
  }

  public onContinue(reservations: Reservation[]): void {


    if(this.returnFlight != undefined) {
      for(let i = 0; i < reservations.slice(0, Math.floor(reservations.length / 2)).length; i++) {
        reservations.slice(Math.floor(reservations.length / 2))[i].passengerCivility = reservations[i].passengerCivility;
        reservations.slice(Math.floor(reservations.length / 2))[i].passengerLastName = reservations[i].passengerLastName;
        reservations.slice(Math.floor(reservations.length / 2))[i].passengerFirstName = reservations[i].passengerFirstName;
      }
    }

    if(this.check(reservations)) {
      // const nbOfPassengersAdults : number = this.route.snapshot.params['nb-of-passengers-adults'];

      if(this.returnFlight != undefined) {
        this.reservationService.outboundReservations = reservations.slice(0, Math.floor(reservations.length / 2));
        this.reservationService.returnReservations = reservations.slice(Math.floor(reservations.length / 2));
      } else {
        this.reservationService.outboundReservations = reservations;
      }

      this.router.navigate([`seat/`])
    }
  }

}
