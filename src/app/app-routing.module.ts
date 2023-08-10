import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RentalComponent} from "./rental/rental.component";
import {CarComponent} from "./car/car.component";
import {CarToRentComponent} from "./car-to-rent/car-to-rent.component";
import {BoardUserComponent} from "./board-user/board-user.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'car', component: CarComponent },
  { path: 'car-to-rent', component: CarToRentComponent },
  { path: 'user', component: BoardUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
