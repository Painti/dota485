/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkFacebookService } from './link-facebook.service';

describe('LinkFacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkFacebookService]
    });
  });

  it('should ...', inject([LinkFacebookService], (service: LinkFacebookService) => {
    expect(service).toBeTruthy();
  }));
});
