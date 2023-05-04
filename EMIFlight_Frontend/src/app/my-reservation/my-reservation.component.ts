import { Component } from '@angular/core';
import { Reservation } from '../model/reservation';
import { AuthService } from '../service/authentication/auth.service';
import { ReservationService } from '../service/reservation.service';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css']
})
export class MyReservationComponent {
  userId!: string;
  reservations: Reservation[] = [];
  selectedReservation?: Reservation;
  hoveredRow: Reservation | undefined;
  constructor(private reservationsService: ReservationService, private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getUserByCredentials(this.authService.username, this.authService.password)
      .subscribe(
        (response: User) => {
          this.authService.currentUser = response;
          this.userId = this.authService.currentUser.id;
          console.log(this.authService.currentUser)
          console.log(this.userId)
          this.reservationsService.getReservationsByUserid(this.userId).subscribe(reservations => {
            this.reservations = reservations;
            console.log(reservations)
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  showReservationDetails(reservation: Reservation) {
    this.selectedReservation = reservation;
    const popup = document.getElementById("popup");
    popup?.classList.toggle("show");
  }

  closeReservationDetails() {
    const popup = document.getElementById("popup");
    popup?.classList.toggle("show");
    this.selectedReservation = undefined;
  }

  onRowHover(reservation: Reservation) {
    this.hoveredRow = reservation;
  }

  onRowLeave() {
    this.hoveredRow = undefined;
  }

  getRowClass(reservation: Reservation) {
    if (reservation === this.hoveredRow) {
      return 'hovered-row';
    }
    return '';
  }
}
