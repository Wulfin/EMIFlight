import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./authentication/auth.service";
import {Observable} from "rxjs";
import {Seats} from "../model/seats";

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getSeatss(): Observable<Seats[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Seats[]>(`${this.apiServerUrl}/seats/all`, {headers : header});
  }

  public addSeats(seats: Seats): Observable<Seats> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Seats>(`${this.apiServerUrl}/seats/add`, seats, {headers : header});
  }

  public updateSeats(seats: Seats): Observable<Seats> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Seats>(`${this.apiServerUrl}/seats/update`, seats, {headers : header});
  }

  public deleteSeats(seatsId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/seats/delete/${seatsId}`, {headers : header});
  }
}
