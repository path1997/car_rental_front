import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading: boolean = false;
  constructor() { }

  showSpinner(){
    this.loading = true;
  }

  hideSpinner(){
    this.loading = false;
  }

  getLoadingStatus(){
    return this.loading;
  }
}
