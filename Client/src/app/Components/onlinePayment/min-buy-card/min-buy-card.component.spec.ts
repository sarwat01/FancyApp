import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinBuyCardComponent } from './min-buy-card.component';

describe('MinBuyCardComponent', () => {
  let component: MinBuyCardComponent;
  let fixture: ComponentFixture<MinBuyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinBuyCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinBuyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
