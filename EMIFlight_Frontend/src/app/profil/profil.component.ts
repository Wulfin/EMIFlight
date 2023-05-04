import { Component } from '@angular/core';
import {AuthService} from "../service/authentication/auth.service";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  user! :User
  image! :string
  n : number = 0

  private _PROFILE_PIC_USERS :string[] = [
    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/610294/pexels-photo-610294.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600"
  ]

  constructor(private _authService: AuthService, private userService: UserService) {
  }


  get authService(): AuthService {
    return this._authService;
  }

  ngOnInit(){
    this.getUser()
  }

  get PROFILE_PIC_USERS(): string[] {
    return this._PROFILE_PIC_USERS;
  }

  set PROFILE_PIC_USERS(value: string[]) {
    this._PROFILE_PIC_USERS = value;
  }

  getUser(){
    this.userService.getUserByCredentials(this._authService.username, this._authService.password)
      .subscribe(
        (response: User) => {
          this.n = Math.floor(Math.random() * 12);
          // @ts-ignore
          this.image = this.PROFILE_PIC_USERS.at(this.n)
          this.user = response;
          this._authService.currentUser = response;
          console.log(this.user)
          console.log(this.authService.currentUser)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
