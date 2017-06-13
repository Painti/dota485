import { TestBed, inject } from '@angular/core/testing';

import { PassJsonService } from './pass-json.service';

describe('PassJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassJsonService]
    });
  });

  it('should be created', inject([PassJsonService], (service: PassJsonService) => {
    expect(service).toBeTruthy();
  }));
});
