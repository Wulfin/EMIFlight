import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../service/reservation.service";
import {Seat} from "../model/seat";
import {HttpErrorResponse} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import {AuthService} from "../service/authentication/auth.service";

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  colsOutbound: string[] = [];
  rowsOutbound: number[] = [];
  colsReturn: string[] = [];
  rowsReturn: number[] = [];
  outboundSeats: Seat[] = [];
  returnSeats: Seat[] = [];
  outboundSelectedSeats: Seat[] = [];
  returnSelectedSeats: Seat[] = [];
  outboundPassengerSelected: number = 0;
  returnPassengerSelected: number = 0;
  nbOfPassengersAdults: number = this.reservationService.outboundReservations.filter(s => s.passengerAgeGroup.code == "AD").length
  nbOfPassengersChildren: number = this.reservationService.outboundReservations.filter(s => s.passengerAgeGroup.code == "CHD").length
  checkker: boolean = (this.rowsReturn.length == 0);
  public clicked: boolean = false;
  public priceAddition: number = 1;
  constructor(public reservationService: ReservationService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    let rowsOutboundStart: number = 0, rowsOutboundFinish: number = 0;
    let rowsReturnStart: number = 0, rowsReturnFinish: number = 0;

    if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Boeing 777") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'B', 'D', 'E', 'F', 'G', 'K', 'L']
        rowsOutboundStart = 1; rowsOutboundFinish = 4;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
        rowsOutboundStart = 17; rowsOutboundFinish = 26;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
        rowsOutboundStart = 27; rowsOutboundFinish = 49;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Boeing 737") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'B', 'E', 'F']
        rowsOutboundStart = 1; rowsOutboundFinish = 4;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F']
        rowsOutboundStart = 7; rowsOutboundFinish = 15;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F']
        rowsOutboundStart = 22; rowsOutboundFinish = 38;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Airbus A330") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'C', 'G', 'J']
        rowsOutboundStart = 1; rowsOutboundFinish = 7;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
        rowsOutboundStart = 10; rowsOutboundFinish = 14;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
        rowsOutboundStart = 15; rowsOutboundFinish = 39;
      }
    }
    else if(this.reservationService.outboundReservations[0].flight.flightGeneric.plane.model == "Airbus A380") {
      if(this.reservationService.outboundReservations[0].seatClass.code == "FST") {
        this.colsOutbound = ['A', 'E', 'F', 'K']
        rowsOutboundStart = 1; rowsOutboundFinish = 3;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI") {
        this.colsOutbound = ['A', 'E', 'F', 'K']
        rowsOutboundStart = 7; rowsOutboundFinish = 25;
      } else if(this.reservationService.outboundReservations[0].seatClass.code == "ECO") {
        this.colsOutbound = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
        rowsOutboundStart = 41; rowsOutboundFinish = 82;
      }
    }

    for(let i = rowsOutboundStart; i <= rowsOutboundFinish; i++) {
      this.rowsOutbound.push(i);
      for(let j = 0; j < this.colsOutbound.length; j++) {
        this.outboundSeats.push(new Seat(true, i, this.colsOutbound[j]));
      }
    }

    this.reservationService.getReservationsByFlightAndClass(this.reservationService.outboundReservations[0].flight.id, this.reservationService.outboundReservations[0].seatClass.code).subscribe(
      (response: Reservation[]) => {
        for(let i = 0; i < response.length; i++) {
          const rowAndCol = response[i].seatNumber.split("-");
          this.outboundSeats[this.outboundSeats.findIndex(s => (s.row == parseInt(rowAndCol[0])) && (s.column == rowAndCol[1]) && s.available)].available = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    for(let i = 0; i < this.reservationService.outboundReservations.length; i++){
      this.outboundSelectedSeats[i] = {available: true, row: 0, column: ''}
    }

    if(this.reservationService.returnReservations.length > 0) {

      if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Boeing 777") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'B', 'D', 'E', 'F', 'G', 'K', 'L']
          rowsReturnStart = 1; rowsReturnFinish = 4;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
          rowsReturnStart = 17; rowsReturnFinish = 26;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L']
          rowsReturnStart = 27; rowsReturnFinish = 49;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Boeing 737") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'B', 'E', 'F']
          rowsReturnStart = 1; rowsReturnFinish = 4;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F']
          rowsReturnStart = 7; rowsReturnFinish = 15;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F']
          rowsReturnStart = 22; rowsReturnFinish = 38;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Airbus A330") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'C', 'G', 'J']
          rowsReturnStart = 1; rowsReturnFinish = 7;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
          rowsReturnStart = 10; rowsReturnFinish = 14;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J']
          rowsReturnStart = 15; rowsReturnFinish = 39;
        }
      }
      else if(this.reservationService.returnReservations[0].flight.flightGeneric.plane.model == "Airbus A380") {
        if(this.reservationService.returnReservations[0].seatClass.code == "FST") {
          this.colsReturn = ['A', 'E', 'F', 'K']
          rowsReturnStart = 1; rowsReturnFinish = 3;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "BUSI") {
          this.colsReturn = ['A', 'E', 'F', 'K']
          rowsReturnStart = 7; rowsReturnFinish = 25;
        } else if(this.reservationService.returnReservations[0].seatClass.code == "ECO") {
          this.colsReturn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
          rowsReturnStart = 41; rowsReturnFinish = 82;
        }
      }

      for(let i = rowsReturnStart; i <= rowsReturnFinish; i++) {
        this.rowsReturn.push(i);
        for(let j = 0; j < this.colsReturn.length; j++) {
          this.returnSeats.push(new Seat(true, i, this.colsReturn[j]));
        }
      }

      this.reservationService.getReservationsByFlightAndClass(this.reservationService.returnReservations[0].flight.id, this.reservationService.returnReservations[0].seatClass.code).subscribe(
        (response: Reservation[]) => {
          for(let i = 0; i < response.length; i++) {
            const rowAndCol = response[i].seatNumber.split("-");
            this.returnSeats[this.returnSeats.findIndex(s => (s.row == parseInt(rowAndCol[0])) && (s.column == rowAndCol[1]) && s.available)].available = false;
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

      for(let i = 0; i < this.reservationService.returnReservations.length; i++){
        this.returnSelectedSeats[i] = {available: true, row: 0, column: ''}
      }
    }

    if(this.reservationService.outboundReservations[0].seatClass.code == "FST")
      this.priceAddition = 7;
    else if(this.reservationService.outboundReservations[0].seatClass.code == "BUSI")
      this.priceAddition = 0.8;

    for(let i = 0; i < this.reservationService.returnReservations.length; i++) {
      if(this.reservationService.outboundReservations[i].passengerAgeGroup.code == "AD") {
        this.reservationService.outboundReservations[i].price = this.reservationService.outboundReservations[i].flight.flightGeneric.basePrice * this.priceAddition
      } else if(this.reservationService.outboundReservations[i].passengerAgeGroup.code == "CHD") {
        this.reservationService.outboundReservations[i].price = this.reservationService.outboundReservations[i].flight.flightGeneric.basePrice * this.priceAddition * 0.75
      }

      if(this.reservationService.returnReservations.length > 0) {
        if(this.reservationService.returnReservations[i].passengerAgeGroup.code == "AD") {
          this.reservationService.returnReservations[i].price = this.reservationService.returnReservations[i].flight.flightGeneric.basePrice * this.priceAddition
        } else if (this.reservationService.returnReservations[i].passengerAgeGroup.code == "CHD") {
          this.reservationService.returnReservations[i].price = this.reservationService.returnReservations[i].flight.flightGeneric.basePrice * this.priceAddition * 0.75
        }
      }
    }

    this.priceAddition = this.priceAddition * (this.nbOfPassengersAdults + (this.nbOfPassengersChildren * 0.75))

    this.priceAddition = Number(this.priceAddition.toFixed(0))



  }

  selectOutboundSeat(seat: Seat, indexOfPasseneger: number): void {
    if (this.outboundSelectedSeats[indexOfPasseneger] == seat) {
      this.outboundSelectedSeats[indexOfPasseneger] = {available: false, row: 0, column: ''};
    }
    else if (this.outboundSelectedSeats[indexOfPasseneger] != seat && !this.outboundSelectedSeats.includes(seat)) {
      if(seat.available)
        this.outboundSelectedSeats[indexOfPasseneger] = seat;
    }
  }

  selectReturnSeat(seat: Seat, indexOfPasseneger: number): void {
    if (this.returnSelectedSeats[indexOfPasseneger] == seat) {
      this.returnSelectedSeats[indexOfPasseneger] = {available: false, row: 0, column: ''};
    }
    else if (this.returnSelectedSeats[indexOfPasseneger] != seat && !this.returnSelectedSeats.includes(seat)) {
      if(seat.available)
        this.returnSelectedSeats[indexOfPasseneger] = seat;
    }
  }


  changeOutboundSelectedPassenger(e : any) {
    this.outboundPassengerSelected = e.target.value;
  }

  changeReturnSelectedPassenger(e : any) {
    this.returnPassengerSelected = e.target.value;
  }

  check(): boolean {
    this.clicked = true;

    for(let i = 0; i < this.outboundSelectedSeats.length; i++) {
      if(this.outboundSelectedSeats[i].row == 0){
        this.checkker = false;
        return false
      }
    }

    if(this.reservationService.returnReservations.length > 0) {
      for(let i = 0; i < this.returnSelectedSeats.length; i++) {
        if(this.returnSelectedSeats[i].row == 0){
          this.checkker = false;
          return false
        }
      }
    }

    this.checkker = true;
    return true
  }

  onContinue(): void {
    if(this.check()) {
      for(let i = 0; i < this.reservationService.outboundReservations.length; i++) {
        this.reservationService.outboundReservations[i].seatNumber = this.outboundSelectedSeats[i].row.toString() + "-" + this.outboundSelectedSeats[i].column;
        this.reservationService.outboundReservations[i].user.id = this.authService.currentUser.id;

        this.reservationService.addReservation(this.reservationService.outboundReservations[i]).subscribe(
          (response: Reservation) => {
            console.log(response)
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }

      if(this.reservationService.returnReservations.length != 0) {
        for(let i = 0; i < this.reservationService.returnReservations.length; i++) {
          this.reservationService.returnReservations[i].seatNumber = this.returnSelectedSeats[i].row.toString() + "-" + this.returnSelectedSeats[i].column;
          this.reservationService.returnReservations[i].user.id = this.authService.currentUser.id;

          this.reservationService.addReservation(this.reservationService.returnReservations[i]).subscribe(
            (response: Reservation) => {
              console.log(response)
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }
      // this.router.navigate([`ticket/`])
    }
  }


  successNotification() {
    Swal.fire({
      title: 'Votre réservation a été créée avec succès.',
      icon: 'success',
      confirmButtonText: 'Générer les billets',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success mx-2'
      },
    }).then(() => {
      for(let i = 0; i < this.reservationService.outboundReservations.length; i++) {
        this.generateTicket(i);
      }
      this.router.navigate([`/`]);
    });
  }


  generateTicket(i: number) {
    const ticket = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [210, 120],
    });
    const xMargin = 10;
    const yMargin = 10;

    // Add the airline logo
    const img = new Image();
    img.src = '../assets/brand/EMIFights-solid.png';
    ticket.addImage(img, 'PNG', xMargin, yMargin, 30, 30);

    // Add the airline name and flight information
    ticket.setFontSize(14);
    ticket.text('EMI Flights', 40, 20);

    let fakeFlightId = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 2; i++) {
      fakeFlightId += characters.charAt(Math.floor(Math.random() * 26)); // Generates a random capital letter
    }

    for (let i = 0; i < 5; i++) {
      fakeFlightId += Math.floor(Math.random() * 10).toString(); // Generates a random number or capital letter
    }

    ticket.text(`Flight Number: ${fakeFlightId}`, 40, 30);
    ticket.text(`From: ${this.reservationService.outboundReservations[i].flight.flightGeneric.departureAirport.city}`, 40, 40);
    ticket.text(`To: ${this.reservationService.outboundReservations[i].flight.flightGeneric.arrivalAirport.city}`, 40, 50);
    ticket.text(`Departure Time: ${this.reservationService.outboundReservations[i].flight.flightGeneric.departureHour} (${this.reservationService.outboundReservations[i].flight.flightGeneric.departureTerminal.label})`, 40, 60);
    ticket.text(`Arrival Time: ${this.reservationService.outboundReservations[i].flight.flightGeneric.arrivalHour} (${this.reservationService.outboundReservations[i].flight.flightGeneric.arrivalTerminal.label})`, 40, 70);

    // Add the passenger name and seat number
    ticket.setFontSize(12);
    ticket.text(`Passenger Name: ${this.reservationService.outboundReservations[i].passengerFirstName} ${this.reservationService.outboundReservations[i].passengerLastName}`, 100, 30);
    ticket.text(`Seat Number: ${this.reservationService.outboundReservations[i].seatNumber}`, 100, 40);

    // Add the boarding pass barcode
    ticket.setFontSize(8);
    ticket.text('Boarding Pass Barcode', 140, 80);
    ticket.rect(140, 85, 50, 20);

    const barcode = new Image();
    barcode.src = '../assets/fakeBarcode.png';
    ticket.addImage(barcode, 'PNG', 140, 85, 50, 20);

    // Save the PDF
    ticket.save(`plane-ticket-${this.reservationService.outboundReservations[i].passengerFirstName}.pdf`);

    if(this.reservationService.returnReservations.length != 0) {
      const ticket = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [210, 120],
      });
      const xMargin = 10;
      const yMargin = 10;

      // Add the airline logo
      const img = new Image();
      img.src = '../assets/brand/EMIFights-solid.png';
      ticket.addImage(img, 'PNG', xMargin, yMargin, 30, 30);

      // Add the airline name and flight information
      ticket.setFontSize(14);
      ticket.text('EMI Flights', 40, 20);

      let fakeFlightId = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      for (let i = 0; i < 2; i++) {
        fakeFlightId += characters.charAt(Math.floor(Math.random() * 26)); // Generates a random capital letter
      }

      for (let i = 0; i < 5; i++) {
        fakeFlightId += Math.floor(Math.random() * 10).toString(); // Generates a random number or capital letter
      }

      ticket.text(`Flight Number: ${fakeFlightId}`, 40, 30);
      ticket.text(`From: ${this.reservationService.returnReservations[i].flight.flightGeneric.departureAirport.city}`, 40, 40);
      ticket.text(`To: ${this.reservationService.returnReservations[i].flight.flightGeneric.arrivalAirport.city}`, 40, 50);
      ticket.text(`Departure Time: ${this.reservationService.returnReservations[i].flight.flightGeneric.departureHour} (${this.reservationService.returnReservations[i].flight.flightGeneric.departureTerminal.label})`, 40, 60);
      ticket.text(`Arrival Time: ${this.reservationService.returnReservations[i].flight.flightGeneric.arrivalHour} (${this.reservationService.returnReservations[i].flight.flightGeneric.arrivalTerminal.label})`, 40, 70);

      // Add the passenger name and seat number
      ticket.setFontSize(12);
      ticket.text(`Passenger Name: ${this.reservationService.returnReservations[i].passengerFirstName} ${this.reservationService.returnReservations[i].passengerLastName}`, 100, 30);
      ticket.text(`Seat Number: ${this.reservationService.returnReservations[i].seatNumber}`, 100, 40);

      // Add the boarding pass barcode
      ticket.setFontSize(8);
      ticket.text('Boarding Pass Barcode', 140, 80);
      ticket.rect(140, 85, 50, 20);

      const barcode = new Image();
      barcode.src = '../assets/fakeBarcode.png';
      ticket.addImage(barcode, 'PNG', 140, 85, 50, 20);

      // Save the PDF
      ticket.save(`plane-ticket-${this.reservationService.returnReservations[i].passengerFirstName}-retour.pdf`);
    }
  }
}

