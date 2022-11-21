import { TestBed } from '@angular/core/testing';

import { HeyService } from './hey.service';

describe('HeyService', () => {
  let service: HeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
