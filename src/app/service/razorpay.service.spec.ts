import { TestBed } from '@angular/core/testing';

import { RazorpayService } from './razorpayservice.service';

describe('RazorpayService', () => {
  let service: RazorpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
