import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {StorageService} from "../storage.service";
import {AuthenticateUser, UserInfo} from "../models/user-info";
import {SnackBarService} from "../snack-bar.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private snackBar: SnackBarService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data: AuthenticateUser) => {
        this.storageService.saveUser(data.userInfoResponse);
        this.storageService.saveToken(data.jwt);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate([''])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.snackBar.openSnackBar(2, "Błąd podczas logowania");
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
