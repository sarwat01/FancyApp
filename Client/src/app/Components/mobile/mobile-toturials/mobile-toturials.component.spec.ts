import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileToturialsComponent } from './mobile-toturials.component';

describe('MobileToturialsComponent', () => {
  let component: MobileToturialsComponent;
  let fixture: ComponentFixture<MobileToturialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileToturialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileToturialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
