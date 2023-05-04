import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/authentication/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/user";
import {AuthGuard} from "../service/authentication/auth.guard";
import 'bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string
  password!: string
  image!: string
  isSignUpForm: boolean = false
  user: User = new User("", "","", "", "", "", "", "",
    "")
  url!: string


  get authService(): AuthService {
    return this._authService;
  }

  set authService(value: AuthService) {
    this._authService = value;
  }

  ngOnInit(){
    console.log(this._authService.appUsers)
  }

  constructor(private _authService: AuthService, private router: Router, private guard: AuthGuard,
              private route: ActivatedRoute) {}

  onSubmit(f: NgForm){
    this.user.username = f.value["username"]
    this.user.password = f.value['password']
    this.username = this.user.username
    this.password = this.user.password
    this._authService.username = this.username
    this._authService.password = this.password
    console.log(`${this.username}  ${this.password}`)
    this.login(this.username, this.password)
  }

  onSubmit2(form: NgForm) {
    console.log(`${form.value["usernameR"]}  ${form.value["passwordR"]}   ${form.value["firstname"]}
    ${form.value["lastname"]}`)
    this.user.username = form.value["usernameR"]
    this.user.password = form.value["passwordR"]
    this.user.firstName = form.value["firstname"]
    this.user.lastName = form.value["lastname"]
    this.user.email = form.value["email"]
    this.user.adress = form.value["adress"]
    this._authService.username = this.user.username
    this._authService.password = this.user.password
    this.register(form.value["usernameR"], form.value["passwordR"], form.value["firstname"],
      form.value["lastname"],form.value["email"],form.value["adress"])
  }

  /*this.authService
    .login(this.form.get('username').value, this.form.get('password')?.value)
    .subscribe((response) => {
      this.router.navigate(['/page']);
    });*/


  private login(username: string, password: string) {
    let found
    let userFound
    /*let userIndex
    let found
    for (let user of this.authService.appUsers){
        console.log(user)
        userIndex = this.authService.appUsers.indexOf(user)
        if (user.username === username) {
          found = true
          break;
        }
    }
    console.log(userIndex)
    console.log(this.authService.tokens)
    // @ts-ignore
    if(this.authService.tokens.length >= userIndex + 1){
      // @ts-ignore
      this.authService.token = this.authService.tokens.at(userIndex + 1)
      this.authService.isLoggedIn = true
      this.router.navigate([""])
    }*/

    // @ts-ignore
    for (let user of this._authService.appUsers.keys()){
      if (user.username === username){
        found = true
        userFound = user
        break;
      }
    }
    if (found){
      // @ts-ignore
      this._authService.token = this._authService.appUsers.get(userFound)
      console.log(this._authService.token)
      this._authService.isLoggedIn = true
      this.router.navigate(["profil"])
    }

    if (!this._authService.isLoggedIn){
      this._authService.authenticate(username, password).subscribe(
        (data: any) => {
          if (!!data) {
            this._authService.token = data.token
            this._authService.tokens = data.tokens
            // @ts-ignore
            this._authService.appUsers.set(data.userDetails, this._authService.token)
            this._authService.isLoggedIn = true
            console.log(this._authService.token)
            console.log(this._authService.isLoggedIn)
            this.router.navigate(["profil"])
          }
          else{
            this._authService.isLoggedIn = false
            alert("Wrong credentials")
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
    }
  }

  register(username: string, password: string, firstname: string, lastname: string, email: string, adress: string) {
    this._authService.register(username, password, firstname, lastname, email, adress).subscribe(
      (data: User) => {
        console.log(data)
        this.login(data.username, data.password)
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
}
