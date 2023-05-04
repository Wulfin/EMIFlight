import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plane} from "../model/plane";
import {User} from "../model/user";
import {AuthService} from "./authentication/auth.service";

interface Credentials {
  usernam: string
  passwor: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getUsers(): Observable<User[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`, {headers: header});
  }


  public getUserByCredentials(username: string, password: string): Observable<User> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<User>(`${this.apiServerUrl}/user/findByCre/${username}/${password}`,
      {headers: header});
  }

  public addUser(user: User): Observable<User> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user, {headers: header});
  }

  public updateUser(user: User): Observable<User> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user, {headers: header});
  }

  public deleteUser(userId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`,
      {headers: header});
  }
}
