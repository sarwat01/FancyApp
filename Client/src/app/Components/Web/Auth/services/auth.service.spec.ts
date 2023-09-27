import { TestBed } from '@angular/core/testing';

import { AuthServiceFancy } from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceFancy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceFancy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
