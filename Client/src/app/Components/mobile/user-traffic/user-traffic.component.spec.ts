import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrafficComponent } from './user-traffic.component';

describe('UserTrafficComponent', () => {
  let component: UserTrafficComponent;
  let fixture: ComponentFixture<UserTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTrafficComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
