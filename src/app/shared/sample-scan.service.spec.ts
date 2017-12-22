import { TestBed, inject } from '@angular/core/testing';

import { SampleScanService } from './sample-scan.service';

describe('SampleScanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleScanService]
    });
  });

  it('should be created', inject([SampleScanService], (service: SampleScanService) => {
    expect(service).toBeTruthy();
  }));
});
