import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../enviroments/enviroment";
import {Plane} from "../model/plane";
import {AuthService} from "./authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getPlanes(): Observable<Plane[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Plane[]>(`${this.apiServerUrl}/plane/all`, {headers : header});
  }

  public addPlane(plane: Plane): Observable<Plane> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Plane>(`${this.apiServerUrl}/plane/add`, plane, {headers : header});
  }

  public updatePlane(plane: Plane): Observable<Plane> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Plane>(`${this.apiServerUrl}/plane/update`, plane, {headers : header});
  }

  public deletePlane(planeId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/plane/delete/${planeId}`, {headers : header});
  }

  public getNumberOfSeats(planeId: string, seatClassCode: string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/seats/get-number-of-seats/${planeId}/${seatClassCode}`);
  }
}
