import { TestBed } from '@angular/core/testing';

import { TokenValidationServiceService } from './token-validation-service.service';

describe('TokenValidationServiceService', () => {
  let service: TokenValidationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenValidationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
