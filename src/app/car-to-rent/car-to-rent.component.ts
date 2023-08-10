import {Component, OnInit} from '@angular/core';
import {Car} from "../models/car";
import {RestService} from "../rest.service";
import {SpinnerService} from "../spinner/spinner.service";
import {SnackBarService} from "../snack-bar.service";
import {DomSanitizer} from "@angular/platform-browser";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-car-to-rent',
  templateUrl: './car-to-rent.component.html',
  styleUrls: ['./car-to-rent.component.css']
})
export class CarToRentComponent implements OnInit{
  cars: Array<Car> = []
  filteredCars: Array<Car> = []
  searchWord: string = "";
  constructor(private service: RestService, private spinner: SpinnerService, private snackBar: SnackBarService, private sanitizer: DomSanitizer, private storageService: StorageService) {
  }
  ngOnInit(): void {
    this.getAllCars()
  }

  getAllCars(){
    this.spinner.showSpinner()
    this.service.getAllCars().subscribe({
      next: (response: Array<Car>) => {
        this.cars = response;
        this.filteredCars = response;
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

  filterCars() {
    if(this.searchWord ==""){
      this.filteredCars = this.cars;
    } else {
      this.filteredCars = this.cars.filter(x => x.mark+x.model+x.year + "".includes(this.searchWord));
    }
  }

  rentCar(id: number) {
    if(!this.storageService.isLoggedIn()){
      this.snackBar.openSnackBar(2, "Zaloguj się by wypożyczyć auto");
      return;
    }
    this.service.rentCar(id).subscribe({
      next: value => {
        this.getAllCars()
      },
      error: err => {
        this.snackBar.openSnackBar(2, "Błąd przy wypożyczaniu auta");
      }
    })
  }
}
