import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFibPaymentComponent } from './check-fib-payment.component';

describe('CheckFibPaymentComponent', () => {
  let component: CheckFibPaymentComponent;
  let fixture: ComponentFixture<CheckFibPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckFibPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckFibPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
