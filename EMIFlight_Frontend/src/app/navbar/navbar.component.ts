import { Component } from '@angular/core';
import {AuthService} from "../service/authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private _authService: AuthService, private router: Router) {
  }


  get authService(): AuthService {
    return this._authService;
  }

  toPlane() {
    if (!this.authService.isLoggedIn) this.authService.redirectToLogin();
    else this.router.navigate(["plane"])
  }
}
