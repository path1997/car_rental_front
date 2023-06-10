import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rental, User} from "./models/rental";

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
}
