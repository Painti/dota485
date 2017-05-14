/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommunicateService } from './communicate.service';

describe('CommunicateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicateService]
    });
  });

  it('should ...', inject([CommunicateService], (service: CommunicateService) => {
    expect(service).toBeTruthy();
  }));
});
