export class User{
  id: number;
  firstNme: string;
  secondName: string;
  phone: string;
  email: string


  constructor(id: number, firstNme: string, secondName: string, phone: string, email: string) {
    this.id = id;
    this.firstNme = firstNme;
    this.secondName = secondName;
    this.phone = phone;
    this.email = email;
  }
}
