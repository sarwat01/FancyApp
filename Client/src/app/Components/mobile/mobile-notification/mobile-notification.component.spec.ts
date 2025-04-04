import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNotificationComponent } from './mobile-notification.component';

describe('MobileNotificationComponent', () => {
  let component: MobileNotificationComponent;
  let fixture: ComponentFixture<MobileNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
