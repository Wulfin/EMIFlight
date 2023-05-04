import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./authentication/auth.service";
import {Observable} from "rxjs";
import {Terminal} from "../model/terminal";

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getTerminals(): Observable<Terminal[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Terminal[]>(`${this.apiServerUrl}/terminal/all`, {headers : header});
  }

  public addTerminal(terminal: Terminal): Observable<Terminal> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Terminal>(`${this.apiServerUrl}/terminal/add`, terminal, {headers : header});
  }

  public updateTerminal(terminal: Terminal): Observable<Terminal> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Terminal>(`${this.apiServerUrl}/terminal/update`, terminal, {headers : header});
  }

  public deleteTerminal(terminalId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/terminal/delete/${terminalId}`, {headers : header});
  }
}
