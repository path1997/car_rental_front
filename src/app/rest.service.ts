import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rental, User} from "./models/rental";
import {Car} from "./models/car";
import {Order} from "./models/order";

const apiUrl = "http://localhost:8080/api/main"
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }


  saveRental(city:string, address:string, phone:string, email:string, photo:File) {
    let formData = new FormData();
    formData.append("city", city);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("photo", photo);
    return this.http.post(apiUrl + "/rental/create", formData);
  }

  getRentals() {
    return this.http.get<Array<Rental>>(apiUrl + "/rental/getRentals");
  }

  getModerators() {
    return this.http.get<Array<User>>(apiUrl + "/user/getModerators");
  }

  saveCar(mark: string, model:string, color: string, year: number, price:number, selectedRental: number, selectedFile1: File, selectedFile2: File, selectedFile3: File) {
    let formData = new FormData();
    formData.append("mark", mark);
    formData.append("model", model);
    formData.append("color", color);
    formData.append("year", year.toString());
    formData.append("price", price.toString());
    formData.append("rentalId", selectedRental.toString());
    formData.append("photo1", selectedFile1);
    formData.append("photo2", selectedFile2);
    formData.append("photo3", selectedFile3);
    return this.http.post(apiUrl + "/car/create", formData);
  }

  modifyCar(carId: number, mark: string, model:string, color: string, year: number, price:number, selectedRental: number, selectedFile1: File, selectedFile2: File, selectedFile3: File) {
    let formData = new FormData();
    formData.append("mark", mark);
    formData.append("model", model);
    formData.append("color", color);
    formData.append("year", year.toString());
    formData.append("price", price.toString());
    formData.append("rentalId", selectedRental.toString());
    formData.append("photo1", selectedFile1);
    formData.append("photo2", selectedFile2);
    formData.append("photo3", selectedFile3);
    return this.http.post(apiUrl + "/car/modify/" + carId, formData);
  }

  getRental(id: number){
    return this.http.get<Rental>(apiUrl + "/rental/get/" + id);
  }

  getCar(id: number) {
    return this.http.get<Car>(apiUrl + "/car/get/" + id);
  }

  getAvailableCars(){
    return this.http.get<Array<Car>>(apiUrl + "/home")
  }

  getUserOrders(){
    return this.http.get<Array<Order>>(apiUrl + "/user/history");
  }

  giveBackCar(orderId: number, rentalId: string){
    return this.http.post(apiUrl + "/user/returncar/" + orderId + "/" + rentalId, "");
  }

  rentCar(carId: number){
    return this.http.post(apiUrl + "/user/rentcar/" + carId, "")
  }

  getAllCars(){
    return this.http.get<Array<Car>>(apiUrl + "/car/get/all")
  }
}
