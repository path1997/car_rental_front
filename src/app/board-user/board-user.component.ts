import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RestService} from "../rest.service";
import {SnackBarService} from "../snack-bar.service";
import {SpinnerService} from "../spinner/spinner.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../storage.service";
import {Order} from "../models/order";
import {Rental} from "../models/rental";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  displayedColumnsActive: Array<string> = ['id', 'auto', 'date_from', 'action'];
  dataSourceActive: any;
  dataSourceHistory: any;
  displayedColumnsHistory: Array<string> = ['id', 'auto', 'date_from', 'date_to'];
  orders: Array<Order> = [];
  rentals: Array<Rental> = [];
  selectedRental: string = "";

  constructor(private service:RestService, private storageService: StorageService, private snackBar: SnackBarService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getRentals();
    this.getUserOrders();
  }

  getUserOrders(){
    this.service.getUserOrders().subscribe({
      next: (data: Array<Order>) => {
        this.orders = data;
        this.dataSourceActive = this.orders.filter(x => x.active);
        this.dataSourceHistory = this.orders.filter(x => !x.active);
      },
      error: err => {
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu zamówień");
      }
    })
  }
  getRentals(){
    this.spinner.showSpinner();
    this.service.getRentals().subscribe({
      next: (response: Array<Rental>) => {
        this.rentals = response;
      }, error: () =>{
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu listy wypożyczalni");
        this.spinner.hideSpinner();
      }, complete: () => {
        this.spinner.hideSpinner();
      }
    });
  }

  giveBackCar(rental: string,orderId: number) {
    this.service.giveBackCar(orderId, rental).subscribe({
      next: value => {
        this.getUserOrders();
      },
      error: err => {
        this.snackBar.openSnackBar(2, "Błąd przy oddawaniu auta");
      }
    })
  }
}
