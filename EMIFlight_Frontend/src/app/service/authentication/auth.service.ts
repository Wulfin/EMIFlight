import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {User} from "../../model/user";
import Swal from 'sweetalert2';
import {flush} from "@angular/core/testing";
import {data} from "jquery";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignUpForm = false
  username!: string
  password!: string
  urlToRedirect! : string
  token! : string|undefined
  tokens :string[] = []
  appUsers = new Map<User, string>();
  currentUser!: User;
  private _isLoggedIn:boolean = false
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
    /*this.appUsers.push(new User("", "Saif Elislam", "Bettaoui", "",
      "", "", "", "password", "saif"))
    this.appUsers.push(new User("", "anas", "Fejoui", "",
      "", "", "", "password_2", "anas"))
    this.appUsers.push(new User("", "Youness", "Ifrah", "",
      "", "", "", "password_3", "youness"))
    this.appUsers.push(new User("", "Houssam Eddine", "Jazouli", "",
      "", "", "", "password_4", "houssam"))*/
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  signUp(){
    Swal.fire({
      title: 'Sign up',
      html:
        '<form>' +
        '<div class="inputContainer">' +
        '<input id="swal-input1" class="swal2-input" type="text" placeholder="Enter your username">' +
        '<label for="swal-input1" class="label">Username</label>' +
        '</div>' +
        '<div class="inputContainer">' +
        '<input id="swal-input2" class="swal2-input" type="password" placeholder="Enter your password">' +
        '<label for="swal-input2" class="label">Password</label>' +
        '</div>' +
        '<div class="inputContainer">' +
        '<input id="swal-input3" class="swal2-input" type="text" placeholder="Enter your email">' +
        '<label for="swal-input3" class="label">Email</label>' +
        '</div>' +
        '<div class="inputContainer">' +
        '<input id="swal-input4" class="swal2-input" type="text" placeholder="Enter your first name">' +
        '<label for="swal-input4" class="label">First name</label>' +
        '</div>' +
        '<div class="inputContainer">' +
        '<input id="swal-input5" class="swal2-input" type="text" placeholder="Enter your last name">' +
        '<label for="swal-input5" class="label">Last name</label>' +
        '</div>' +
        '<div class="inputContainer">' +
        '<input id="swal-input6" class="swal2-input" type="text" placeholder="Enter your adress">' +
        '<label for="swal-input6" class="label">Adress</label>' +
        '</div>' +
        '</form>',
      focusConfirm: false,
      preConfirm: () => {
        // @ts-ignore
        const username = Swal.getPopup().querySelector('#swal-input1').value
        // @ts-ignore
        const password = Swal.getPopup().querySelector('#swal-input2').value
        // @ts-ignore
        const firstname = Swal.getPopup().querySelector('#swal-input4').value
        // @ts-ignore
        const lastname = Swal.getPopup().querySelector('#swal-input5').value
        // @ts-ignore
        const email = Swal.getPopup().querySelector('#swal-input3').value
        // @ts-ignore
        const adress = Swal.getPopup().querySelector('#swal-input6').value
        console.log(username)
        console.log(password)
        this.username = username
        this.password = password

        fetch('http://localhost:8080/user/add', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            firstName: firstname,
            lastName: lastname,
            username: username,
            password: password,
            email: email,
            adress: adress
          })
        }).then(res => res.json())
          .then(data => {
            console.log(data)
          })

        let found
        let userFound
        // @ts-ignore
        this.appUsers = JSON.parse(localStorage.getItem("users"))
        for (let user of this.appUsers.keys()) {
          if (user.username === username) {
            found = true
            userFound = user
            break;
          }
        }
        if (found) {

          // @ts-ignore
          this.token = this.appUsers.get(userFound)
          console.log(this.token)
          this.isLoggedIn = true
          Swal.fire(
            'You are authenticated!',
            `<p>Welcome ${this.username}</p>`,
            'success'
          )
          return;
        }

        return this.toLogIn(username, password)

      }
    });
  }


  toLogIn(username: string, password: string){
    return fetch('http://localhost:8080/auth/authenticate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: username,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        this.token = data.token
        this.tokens = data.tokens
        if(this.token == undefined) {
          /*Swal.fire({
            title: 'Authentication failed. Please try again.',
            html:``,
            icon: "error"
          })*/
          //Swal.showValidationMessage(`Authentication failed. Please try again.`)
        }
        // @ts-ignore
        if (this.token != undefined){
          this.appUsers.set(data.userDetails, this.token)
          this.isLoggedIn = true
        }
        console.log(this.token)
        console.log(this.isLoggedIn)
        if (this.isLoggedIn){
          Swal.fire(
            'You are authenticated!',
            `<p>Welcome ${this.username}</p>`,
            'success'
          )
        }
        else {
          Swal.fire({
              title: 'Authentication failed. Please try again.',
              html: ``,
              icon: "error",
              preConfirm: () => this.isAuthenticated()
            }
          );
        }
      })
      .catch(error => {
        console.log('Error:', error);
        this.isLoggedIn = false
        console.log(`in authenticate ${this._isLoggedIn}`)
        Swal.showValidationMessage(`Authentication failed. Please try again.`)
      });
  }



  isAuthenticated() {
    if (!this.isLoggedIn) {
      Swal.fire({
        title: 'Login',
        html:
          '<form>' +
          '<div class="inputContainer">' +
          '<input id="swal-input1" class="swal2-input" type="text" placeholder="Enter your username">' +
          '<label for="swal-input1" class="label">Username</label>' +
          '</div>' +
          '<div class="inputContainer">' +
          '<input id="swal-input2" class="swal2-input" type="password" placeholder="Enter your password">' +
          '<label for="swal-input2" class="label">Password</label>' +
          '</div>' +
          `<span>You don't have an account ? you can register with a new account</span>`+
          '</form>',
        focusConfirm: false,
        preConfirm: () => {
          // @ts-ignore
          const username = Swal.getPopup().querySelector('#swal-input1').value
          // @ts-ignore
          const password = Swal.getPopup().querySelector('#swal-input2').value
          console.log(username)
          console.log(password)
          this.username = username
          this.password = password

          let found
          let userFound
          for (let user of this.appUsers.keys()) {
            if (user.username === username) {
              found = true
              userFound = user
              break;
            }
          }
          if (found) {

            // @ts-ignore
            this.token = this.appUsers.get(userFound)
            console.log(this.token)
            this.isLoggedIn = true
            Swal.fire(
              'You are authenticated!',
              `<p>Welcome ${this.username}</p>`,
              'success'
            )
            return;
          }

          return this.toLogIn(username, password)
        }
      });
    }
  }

  authenticate(username: string, password: string): Observable<any>{
    //let headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    let body = {
      email: username,
      password: password
    };
    return this.http.post<any>('http://localhost:8080/auth/authenticate', {
      email: username,
      password: password
    })
    /*fetch('http://localhost:8080/auth/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email : username,
        password : password
      })
    }).then(res => res.text())
      .then(data => {
        this.token = data
        this.isLoggedIn = true;
        console.log(this.token)
        console.log(`in authenticate ${this._isLoggedIn}`)
      })
      .catch(error => {
        console.log('Error:', error);
        this.isLoggedIn = false
        console.log(`in authenticate ${this._isLoggedIn}`)
      });
    console.log(`in authenticate 2 ${this._isLoggedIn}`)
    return this._isLoggedIn*/
  }

  register(username: string, password: string, firstname: string, lastname: string, email:string, adress:string){
    return this.http.post<any>('http://localhost:8080/user/add', {
      firstName: firstname,
      lastName: lastname,
      username: username,
      password: password,
      email: email,
      adress: adress
    })
  }

  logout(){
    this.token = undefined
    this.isLoggedIn = false
    console.log(this.token)
    console.log("Logged out")
    this.router.navigate(["login"])
  }

  redirectToLogin(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.urlToRedirect = event.url;
        console.log(this.urlToRedirect)
      });
      this.router.navigate(["login"])
  }
}
