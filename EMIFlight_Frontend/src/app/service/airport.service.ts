import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../model/airport";
import {AuthService} from "./authentication/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.apiServerUrl}/airport/all`);
  }

  public getAirportByCode(airportCode: string): Observable<Airport> {
    return this.http.get<Airport>(`${this.apiServerUrl}/airport/find/${airportCode}`);
  }

  public addAirport(airport: Airport): Observable<Airport> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Airport>(`${this.apiServerUrl}/airport/add`, airport, {headers : header});
  }

  public updateAirport(airport: Airport): Observable<Airport> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Airport>(`${this.apiServerUrl}/airport/update`, airport, {headers : header});
  }

  public deleteAirport(airportId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/airport/delete/${airportId}`, {headers : header});
  }
}
