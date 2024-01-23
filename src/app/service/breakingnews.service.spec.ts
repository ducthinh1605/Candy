import { TestBed } from '@angular/core/testing';

import { BreakingnewsService } from './breakingnews.service';

describe('BreakingnewsService', () => {
  let service: BreakingnewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakingnewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
