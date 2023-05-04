import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./authentication/auth.service";
import {Observable} from "rxjs";
import {FlightGeneric} from "../model/flightGeneric";

@Injectable({
  providedIn: 'root'
})
export class FlightGenericService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getFlightGenerics(): Observable<FlightGeneric[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<FlightGeneric[]>(`${this.apiServerUrl}/flightGeneric/all`, {headers : header});
  }

  public addFlightGeneric(flightGeneric: FlightGeneric): Observable<FlightGeneric> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<FlightGeneric>(`${this.apiServerUrl}/flightGeneric/add`, flightGeneric, {headers : header});
  }

  public updateFlightGeneric(flightGeneric: FlightGeneric): Observable<FlightGeneric> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<FlightGeneric>(`${this.apiServerUrl}/flightGeneric/update`, flightGeneric, {headers : header});
  }

  public deleteFlightGeneric(flightGenericId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/flightGeneric/delete/${flightGenericId}`, {headers : header});
  }
}
