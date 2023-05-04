export class ReservationStatus {
  code: string;
  label!: string;


  constructor(code: string) {
    this.code = code;
  }
}
