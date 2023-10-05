import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUserComponent } from './web-user.component';

describe('WebUserComponent', () => {
  let component: WebUserComponent;
  let fixture: ComponentFixture<WebUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
