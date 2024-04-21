import { TestBed } from '@angular/core/testing';

import { SaldoCajaService } from './saldo-caja.service';

describe('SaldoCajaService', () => {
  let service: SaldoCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldoCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
