import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(duration: number, message: string){
    this.snackBar.open(message, "X", {
      duration: duration * 1000
    })
  }
}
