import {Component, OnInit} from '@angular/core';
import {Car} from "../models/car";
import {RestService} from "../rest.service";
import {SnackBarService} from "../snack-bar.service";
import {SpinnerService} from "../spinner/spinner.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  cars: Array<Car> = [];

  constructor(private service:RestService, private storageService: StorageService, private snackBar: SnackBarService, private spinner: SpinnerService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getAvailableCars()
  }

  getAvailableCars() {
    this.spinner.showSpinner()
    this.service.getAvailableCars().subscribe({
      next: (response: Array<Car>) => {
        this.cars = response;
        console.log(this.cars)
        this.spinner.hideSpinner();
      },
      error: (error: any) => {
        console.log(error)
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu dostępnych aut")
      }
    });
  }

  getImageFromBaseArray(car: Car){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + car.photo1)
  }

  rentCar(id: number) {
    if(!this.storageService.isLoggedIn()){
      this.snackBar.openSnackBar(2, "Zaloguj się by wypożyczyć auto");
      return;
    }
    this.service.rentCar(id).subscribe({
      next: value => {
        this.getAvailableCars()
      },
      error: err => {
        this.snackBar.openSnackBar(2, "Błąd przy wypożyczaniu auta");
      }
    })
  }
}
