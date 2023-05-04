export class User {

  id: string
  image: string
  firstName: string
  lastName: string
  email: string
  birthDate: string
  adress: string
  password: string
  username: string


  constructor(id: string,image: string, firstName: string, lastName: string, email: string, birthDate: string, adress: string, password: string, username: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.adress = adress;
    this.password = password;
    this.username = username;
    this.image = image;
  }
}
