import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./http.interceptor";
import {HttpClientModule} from "@angular/common/http";
import { RentalComponent } from './rental/rental.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { CarToRentComponent } from './car-to-rent/car-to-rent.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { ImageSliderComponent } from './image-slider/image-slider.component';
import {ImageSliderModule} from "./image-slider/image-slider.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarComponent,
    LoginComponent,
    RegisterComponent,
    RentalComponent,
    SpinnerComponent,
    BoardModeratorComponent,
    BoardAdminComponent,
    BoardUserComponent,
    CarToRentComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        HttpClientModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NgxMatFileInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTableModule,
        MatCardModule,
        ImageSliderModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
