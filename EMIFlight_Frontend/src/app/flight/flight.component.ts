import {Component, OnInit} from '@angular/core';
import {Flight} from "../model/flight";
import {FlightService} from "../service/flight.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AirportService} from "../service/airport.service";
import {Airport} from "../model/airport";
import {AuthService} from "../service/authentication/auth.service";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit{
  public outboundFlights: Flight[] = [];
  public returnFlights: Flight[] = [];
  public depAirport!: Airport;
  public arrAirport!: Airport;
  public chosenOutboundFlight!: Flight;
  public chosenReturnFlight!: Flight;
  public priceAddition: number = 1;

  outboundDurations: string[] = [];
  returnDurations: string[] = [];


  constructor(private flightService: FlightService, private airportService: AirportService, private  route : ActivatedRoute, private router: Router, private authService: AuthService) {}

  public searchOutboundFlights(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): void {
    this.flightService.searchFlight(depAirport, arrAirport, depDate, _class, nbOfPassengers).subscribe(
      (response: Flight[]) => {
        this.outboundFlights = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchReturnFlights(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): void {
    this.flightService.searchFlight(depAirport, arrAirport, depDate, _class, nbOfPassengers).subscribe(
      (response: Flight[]) => {
        this.returnFlights = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCities(depAirport: string, arrAirport: string): void {
    this.airportService.getAirportByCode(depAirport).subscribe(
      (response: Airport) => {
        this.depAirport = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.airportService.getAirportByCode(arrAirport).subscribe(
      (response: Airport) => {
        this.arrAirport = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public airportDep !: string;
  public airportArr !: string;
  public depDate !: string;
  public _class !: string;
  public nbOfPassengersAdults : number = 0;
  public nbOfPassengersChildren : number = 0;
  public reDate : string | undefined;
  today!: string;
  ngOnInit(): void {
    this.getFlights()
    this.authService.isAuthenticated()

    if(this.authService.isLoggedIn) {
      this.today = new Date().toISOString().substr(0, 10);

      this.airportDep = this.route.snapshot.params['dep-airport'];
      this.airportArr = this.route.snapshot.params['arr-airport'];
      this.depDate = this.route.snapshot.params['dep-date'];
      this._class = this.route.snapshot.params['class'];
      this.nbOfPassengersAdults = parseInt(this.route.snapshot.params['nb-of-passengers-adults']);
      this.nbOfPassengersChildren = parseInt(this.route.snapshot.params['nb-of-passengers-children']);

      this.reDate = this.route.snapshot.params['re-date'];

      this.searchOutboundFlights(this.airportDep, this.airportArr, this.depDate, this._class, this.nbOfPassengersAdults + this.nbOfPassengersChildren);
      for(let i = 0; i < this.outboundFlights.length; i++) {
        // this.outboundDurations[i] = Math.abs(new Date(this.outboundFlights[i].flightGeneric.departureHour.toString()))
      }

      if (this.reDate != undefined)
        this.searchReturnFlights(this.airportArr, this.airportDep, this.reDate, this._class, this.nbOfPassengersAdults + this.nbOfPassengersChildren);

      this.getCities(this.airportDep, this.airportArr);

      if(this._class == "FST")
        this.priceAddition = 7;
      else if(this._class == "BUSI")
        this.priceAddition = 0.8;

      this.priceAddition = this.priceAddition * (this.nbOfPassengersAdults + (this.nbOfPassengersChildren * 0.75))
      this.priceAddition = Number(this.priceAddition.toFixed(0))
    }
  }

  public chooseOutboundFlight(outboundFlight: Flight) : void {
    this.chosenOutboundFlight = outboundFlight;
  }
  public chooseReturnFlight(returnFlight: Flight) : void {
    this.chosenReturnFlight = returnFlight;
  }

  onChooseFlights(outboundFlightId: string, returnFlightId: string) {
    const nbOfPassengersAdults : number = this.route.snapshot.params['nb-of-passengers-adults'];
    const nbOfPassengersChildren : number = this.route.snapshot.params['nb-of-passengers-children'];
    const _class : string = this.route.snapshot.params['class'];


    this.router.navigate([`passengers/${outboundFlightId}/${returnFlightId}/${nbOfPassengersAdults}/${nbOfPassengersChildren}/${_class}`])

    /*if (this.flightType == 'one-way')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}`])
    else if (this.flightType == 'round-trip')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}/${reDate}`])*/
  }

  onChooseFlight(outboundFlightId: string) {
    const nbOfPassengersAdults : number = this.route.snapshot.params['nb-of-passengers-adults'];
    const nbOfPassengersChildren : number = this.route.snapshot.params['nb-of-passengers-children'];
    const _class : string = this.route.snapshot.params['class'];


    this.router.navigate([`passengers/${outboundFlightId}/${nbOfPassengersAdults}/${nbOfPassengersChildren}/${_class}`])

    /*if (this.flightType == 'one-way')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}`])
    else if (this.flightType == 'round-trip')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengers}/${reDate}`])*/
  }

  changeIfAfter() {
    if(this.reDate != undefined) {
      if(Date.parse(this.depDate) > Date.parse(this.reDate)) {
        this.reDate = this.depDate;
        this.searchReturnFlights(this.airportArr, this.airportDep, this.reDate, this._class, this.nbOfPassengersAdults + this.nbOfPassengersChildren);
      }
    }
  }

  getFlights() {
    if(this.authService.isLoggedIn) {
      this.today = new Date().toISOString().substr(0, 10);

      this.airportDep = this.route.snapshot.params['dep-airport'];
      this.airportArr = this.route.snapshot.params['arr-airport'];
      this.depDate = this.route.snapshot.params['dep-date'];
      this._class = this.route.snapshot.params['class'];
      this.nbOfPassengersAdults = parseInt(this.route.snapshot.params['nb-of-passengers-adults']);
      this.nbOfPassengersChildren = parseInt(this.route.snapshot.params['nb-of-passengers-children']);

      this.reDate = this.route.snapshot.params['re-date'];

      this.searchOutboundFlights(this.airportDep, this.airportArr, this.depDate, this._class, this.nbOfPassengersAdults + this.nbOfPassengersChildren);
      if (this.reDate != undefined)
        this.searchReturnFlights(this.airportArr, this.airportDep, this.reDate, this._class, this.nbOfPassengersAdults + this.nbOfPassengersChildren);

      this.getCities(this.airportDep, this.airportArr);

      if(this._class == "FST")
        this.priceAddition = 7;
      else if(this._class == "BUSI")
        this.priceAddition = 0.8;

      this.priceAddition = this.priceAddition * (this.nbOfPassengersAdults + (this.nbOfPassengersChildren * 0.75))
      this.priceAddition = Number(this.priceAddition.toFixed(0))
    }
  }
}
