import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";
import {AuthService} from "./authentication/auth.service";


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public searchFlight(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): Observable<Flight[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<Flight[]>(`${this.apiServerUrl}/flight/search?depAirport=${depAirport}&arrAirport=${arrAirport}&depDate=${depDate}&classCode=${_class}&numberOfPassengers=${nbOfPassengers}`, {headers: header});
  }

  public getFlightById(flightId: string): Observable<Flight> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<Flight>(`${this.apiServerUrl}/flight/find/${flightId}`, {headers: header});
  }

  public getflights(): Observable<Flight[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Flight[]>(`${this.apiServerUrl}/flight/all`, {headers : header});
  }

  public addflight(flight: Flight): Observable<Flight> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Flight>(`${this.apiServerUrl}/flight/add`, flight, {headers : header});
  }

  public updateflight(flight: Flight): Observable<Flight> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Flight>(`${this.apiServerUrl}/flight/update`, flight, {headers : header});
  }

  public deleteflight(flightId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/flight/delete/${flightId}`, {headers : header});
  }
}
