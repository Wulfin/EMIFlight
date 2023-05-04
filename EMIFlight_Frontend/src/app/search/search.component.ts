import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Airport} from "../model/airport";
import {HttpErrorResponse} from "@angular/common/http";
import {AirportService} from "../service/airport.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {User} from "../model/user";
import {AuthService} from "../service/authentication/auth.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public airports : Airport[] = [];
  date: Date = new Date();
  today!: string;
  today2!: string;
  flightType: string = 'one-way';

  isBeforeDate: boolean = false;
  constructor(private route: Router, private airportService : AirportService, private authService: AuthService,
              private userService: UserService) {
  }

  onSearchFlight(origin: string, destination: string, depDate: string, _class: string, nbOfPassengersAdults: string, nbOfPassengersChildren: string, reDate: string) {
    // const nbOfPassengers: number = parseInt(nbOfPassengersAdults) + parseInt(nbOfPassengersChildren);
    if (this.flightType == 'one-way')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengersAdults}/${nbOfPassengersChildren}`])
    else if (this.flightType == 'round-trip')
      this.route.navigate([`searchflight/${origin}/${destination}/${depDate}/${_class}/${nbOfPassengersAdults}/${nbOfPassengersChildren}/${reDate}`])
  }

  control = new FormControl<string | Airport>('');
  filteredOptions!: Observable<Airport[]>;
  public getAirports(): void {
    this.airportService.getAirports().subscribe(
      (response: Airport[]) => {
        this.airports = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit() {
    this.today = this.date.toISOString().substr(0, 10);
    this.today2 = this.date.toISOString().substr(0, 10);

    this.getAirports();
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        const city = typeof value === 'string' ? value : value?.city;
        return city ? this._filter(city as string) : this.airports.slice();
      }),
    );

    if(this.authService.isLoggedIn) {
      this.getUser();
    }
  }

  displayFn(airport: Airport): string {
    return airport && airport.code ? airport.code : '';
  }

  private _filter(city: string): Airport[] {
    const filterValue = city.toLowerCase();

    return this.airports.filter(airport => airport.city.toLowerCase().includes(filterValue));
  }

  isBefore(date1: string, date2: string): boolean {
    let date11 = new Date(Date.parse(date1));
    let date22 = new Date(Date.parse(date2));

    date22.setDate(date22.getDate() + 1);

    return date11 < date22;
  }

  getUser(){
    this.userService.getUserByCredentials(this.authService.username, this.authService.password)
      .subscribe(
        (response: User) => {
          this.authService.currentUser = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
