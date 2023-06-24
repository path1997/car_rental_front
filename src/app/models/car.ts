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
  rental: Rental


  constructor(id: number, mark: string, model: string, color: string, year: number, price: number, photo1: string, photo2: string, photo3: string, rental: Rental) {
    this.id = id;
    this.mark = mark;
    this.model = model;
    this.color = color;
    this.year = year;
    this.price = price;
    this.photo1 = photo1;
    this.photo2 = photo2;
    this.photo3 = photo3;
    this.rental = rental;
  }
}

export class Rental {
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  photo: string;

  constructor(id: number, city: string, address: string, phone: string, email: string, photo: string) {
    this.id = id;
    this.city = city;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.photo = photo;
  }
}
