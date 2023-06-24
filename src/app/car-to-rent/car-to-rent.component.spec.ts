import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarToRentComponent } from './car-to-rent.component';

describe('CarToRentComponent', () => {
  let component: CarToRentComponent;
  let fixture: ComponentFixture<CarToRentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarToRentComponent]
    });
    fixture = TestBed.createComponent(CarToRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
