import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MaxSizeValidator} from "@angular-material-components/file-input";
import {RestService} from "../rest.service";
import {SnackBarService} from "../snack-bar.service";
import {SpinnerService} from "../spinner/spinner.service";
import {User} from "../models/rental";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  url: any = null;
  moderators: Array<User> = [];
  selectedModerators: Array<number> = [];
  constructor(private fb: FormBuilder, private service:RestService, private snackBar: SnackBarService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.getModerators();
    this.form = this.fb.group({
      city: [null, [Validators.required, Validators.minLength(1)]],
      address: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  saveRental() {
    if(this.form.invalid){
      this.snackBar.openSnackBar(2, "Uzupełnij wymagane pola");
      return;
    }
    if(this.selectedFile == null){
      this.snackBar.openSnackBar(2, "Załaduj zdjęcie zdjęcie");
      return;
    }
    this.spinner.showSpinner();
    // @ts-ignore
    this.service.saveRental(this.form.get('city')?.value, this.form.get('address')?.value, this.form.get('email')?.value, this.form.get('phone')?.value, this.selectedFile).subscribe({
      next:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Dodano wypożyczalnię");
        this.form.reset();
        this.selectedFile = null;
      }, error:() => {
        this.spinner.hideSpinner();
        this.snackBar.openSnackBar(2, "Błąd przy dodawaniu wypożyczalni");
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getModerators(){
    this.spinner.showSpinner();
    this.service.getModerators().subscribe({
      next: (response: Array<User>) => {
        this.moderators = response;
      }, error: () =>{
        this.snackBar.openSnackBar(2, "Błąd przy pobieraniu listy moderatorów");
        this.spinner.hideSpinner();
      }, complete: () => {
        this.spinner.hideSpinner();
      }
    });
  }
}
