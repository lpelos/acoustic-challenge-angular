import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AcousticContentClient } from './acoustic-content.client';

describe('AcousticContentClient', () => {
  let service: AcousticContentClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AcousticContentClient],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AcousticContentClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
