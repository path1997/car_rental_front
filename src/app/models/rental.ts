export class Rental{
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  photo: string;
  moderators: Array<User>;
  cars: Array<Car>;


  constructor(id: number, city: string, address: string, phone: string, email: string, photo: string, moderators: Array<User>, cars: Array<Car>) {
    this.id = id;
    this.city = city;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.photo = photo;
    this.moderators = moderators;
    this.cars = cars;
  }
}

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

export class Car {
  id: number;
  mark: string;
  model: string;
  color: string;
  year: number;
  price: number;
  photo1: string;
  photo2: string;
  photo3: string;


  constructor(id: number, mark: string, model: string, color: string, year: number, price: number, photo1: string, photo2: string, photo3: string) {
    this.id = id;
    this.mark = mark;
    this.model = model;
    this.color = color;
    this.year = year;
    this.price = price;
    this.photo1 = photo1;
    this.photo2 = photo2;
    this.photo3 = photo3;
  }
}
