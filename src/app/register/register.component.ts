import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {SnackBarService} from "../snack-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstName: null,
    secondName: null,
    phone: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private snackBar: SnackBarService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { firstName, secondName, phone, email, password } = this.form;

    this.authService.register(firstName, secondName, phone, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.snackBar.openSnackBar(2, "Błąd podczas tworzenia konta");
      }
    });
  }
}
