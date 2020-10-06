import { TestBed } from '@angular/core/testing';

import { RoomsAccountingService } from './rooms-accounting.service';

describe('RoomsAccountingService', () => {
  let service: RoomsAccountingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsAccountingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
