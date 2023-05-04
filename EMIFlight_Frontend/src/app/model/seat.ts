export class Seat {
  available: boolean;
  row: number;
  column: string;

  constructor(available: boolean, row: number, column: string) {
    this.available = available;
    this.row = row;
    this.column = column;
  }
}
