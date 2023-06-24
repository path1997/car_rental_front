import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../rest.service";
import {SnackBarService} from "../snack-bar.service";
import {SpinnerService} from "../spinner/spinner.service";
import {Rental, User} from "../models/rental";
import {ActivatedRoute} from "@angular/router";
import {Car} from "../models/car";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;
  url1: any = null;
  url2: any = null;
  url3: any = null;
  rentals: Array<Rental> = [];
  carId: number = 0;
  // @ts-ignore
  car: Car
  constructor(private fb: FormBuilder, private service:RestService, private snackBar: SnackBarService, private spinner: SpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRentals();
    this.route.queryParams.subscribe({
      next: (params) => {
        if(params['id']){
          this.carId = params['id'];
          this.loadForm();
        }
      },
      error: (e: any) => {
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu id ogłoszenia");
      }
    });
    if(this.carId!= 0) {
      this.form = this.fb.group({
        mark: [this.car.mark, [Validators.required, Validators.minLength(1)]],
        model: [this.car.model, [Validators.required, Validators.minLength(1)]],
        color: [this.car.color, [Validators.required, Validators.minLength(1)]],
        year: [this.car.year, [Validators.required, Validators.minLength(4)]],
        price: [this.car.price, [Validators.required, Validators.minLength(1)]],
        rental: [this.car.rental.id]
      });
    } else {
      this.form = this.fb.group({
        mark: [null, [Validators.required, Validators.minLength(1)]],
        model: [null, [Validators.required, Validators.minLength(1)]],
        color: [null, [Validators.required, Validators.minLength(1)]],
        year: [null, [Validators.required, Validators.minLength(4)]],
        price: [null, [Validators.required, Validators.minLength(1)]],
        rental: [null]
      });
    }
  }

  loadForm(){
    this.spinner.showSpinner();
    this.service.getCar(this.carId).subscribe({
      next: (response: Car) =>{
        this.spinner.hideSpinner();
        this.car = response;
      },
      error: () => {
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu samochodu");
        this.spinner.hideSpinner();
      }
    });
  }

  onFileSelected(event: any, photoNumber: number): void {
    if(photoNumber == 1) {
      this.selectedFile1 = event.target.files[0] ?? null;
    } else if (photoNumber == 2) {
      this.selectedFile2 = event.target.files[0] ?? null;
    } else if (photoNumber == 3) {
      this.selectedFile3 = event.target.files[0] ?? null;
    }
    var reader = new FileReader();

    reader.onload = (event: any) => {
      if(photoNumber == 1) {
        this.url1 = event.target.result;
      } else if (photoNumber == 2) {
        this.url2 = event.target.result;
      } else if (photoNumber == 3) {
        this.url3 = event.target.result;
      }
    };
    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
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

  onSubmit(){
    if(this.form.invalid){
      this.snackBar.openSnackBar(2, "Uzupełnij wymagane pola");
      return;
    }
    if(this.selectedFile1 == null){
      this.snackBar.openSnackBar(2, "Załaduj zdjęcie zdjęcie");
      return;
    }
    if(this.carId == 0){
      this.saveCar()
    } else {
      this.modifyCar();
    }
  }

  saveCar() {
    this.spinner.showSpinner();
    // @ts-ignore
    this.service.saveCar(this.form.get('mark')?.value, this.form.get('model')?.value, this.form.get('color')?.value, this.form.get('year')?.value, this.form.get('price')?.value, this.form.get('rental')?.value, this.selectedFile1, this.selectedFile2, this.selectedFile3).subscribe({
      next:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Dodano samochód");
        this.form.reset();
        this.selectedFile1 = null;
        this.selectedFile2 = null;
        this.selectedFile3 = null;
      }, error:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Błąd przy dodawaniu samochodu");
      }
    });
  }

  modifyCar(){
    this.spinner.showSpinner();
    // @ts-ignore
    this.service.modifyCar(this.carId, this.form.get('mark')?.value, this.form.get('model')?.value, this.form.get('color')?.value, this.form.get('year')?.value, this.form.get('price')?.value, this.form.get('rental')?.value, this.selectedFile1, this.selectedFile2, this.selectedFile3).subscribe({
      next:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Zmodyfikowano samochód");
        this.form.reset();
        this.selectedFile1 = null;
        this.selectedFile2 = null;
        this.selectedFile3 = null;
      }, error:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Błąd przy dodawaniu samochodu");
      }
    });
  }
}
