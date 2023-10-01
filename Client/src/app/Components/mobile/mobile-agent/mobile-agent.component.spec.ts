import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAgentComponent } from './mobile-agent.component';

describe('MobileAgentComponent', () => {
  let component: MobileAgentComponent;
  let fixture: ComponentFixture<MobileAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
