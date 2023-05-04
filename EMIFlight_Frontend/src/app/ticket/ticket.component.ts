import { Component } from '@angular/core';
import jsPDF from "jspdf";
import {ReservationService} from "../service/reservation.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {


  constructor(private reservationService: ReservationService) {}

  generateTicket() {
    const doc = new jsPDF();
    const ticketWidth = 210; // Width of A4 paper in mm
    const ticketHeight = 100; // Height of the ticket in mm
    const xMargin = 10;
    const yMargin = 10;

    // Add the airline logo
    const img = new Image();
    img.src = '../assets/brand/EMIFights-solid.png';
    doc.addImage(img, 'PNG', xMargin, yMargin, 30, 30);

    // Add the airline name and flight information
    doc.setFontSize(14);
    doc.text('Airline Name', 40, 20);

    let fakeFlightId = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    for (let i = 0; i < 2; i++) {
      fakeFlightId += characters.charAt(Math.floor(Math.random() * 26)); // Generates a random capital letter
    }

    for (let i = 0; i < 5; i++) {
      fakeFlightId += Math.floor(Math.random() * 10).toString(); // Generates a random number or capital letter
    }

    doc.text(`Flight Number: ${fakeFlightId}`, 40, 30);
    doc.text(`From: ${this.reservationService.outboundReservations[0].flight.flightGeneric.departureAirport.city}`, 40, 40);
    doc.text(`To: ${this.reservationService.outboundReservations[0].flight.flightGeneric.arrivalAirport.city}`, 40, 50);
    doc.text(`Departure Time: ${this.reservationService.outboundReservations[0].flight.flightGeneric.departureHour}`, 40, 60);
    doc.text(`Arrival Time: ${this.reservationService.outboundReservations[0].flight.flightGeneric.arrivalHour}`, 40, 70);

    // Add the passenger name and seat number
    doc.setFontSize(12);
    doc.text(`Passenger Name: ${this.reservationService.outboundReservations[0].passengerFirstName} ${this.reservationService.outboundReservations[0].passengerLastName}`, 100, 30);
    doc.text(`Seat Number: ${this.reservationService.outboundReservations[0].seatNumber}`, 100, 40);

    // Add the boarding pass barcode
    doc.setFontSize(8);
    doc.text('Boarding Pass Barcode', 140, 50);
    doc.rect(140, 60, 50, 20);

    const barcode = new Image();
    barcode.src = '../assets/fakeBarcode.png';
    doc.addImage(barcode, 'PNG', 141, 61, 49, 19);

    // Save the PDF
    doc.save('plane-ticket.pdf');
  }
}
