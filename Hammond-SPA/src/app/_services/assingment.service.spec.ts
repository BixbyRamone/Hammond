/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssingmentService } from './assingment.service';

describe('Service: Assingment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssingmentService]
    });
  });

  it('should ...', inject([AssingmentService], (service: AssingmentService) => {
    expect(service).toBeTruthy();
  }));
});
