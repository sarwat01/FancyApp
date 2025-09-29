import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FIBComponent } from './fib.component';

describe('FIBComponent', () => {
  let component: FIBComponent;
  let fixture: ComponentFixture<FIBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FIBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FIBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
