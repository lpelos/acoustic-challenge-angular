import { TestBed } from '@angular/core/testing';

import { AcousticContentClient } from './acoustic-content.client';

describe('AcousticContentClient', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcousticContentClient = TestBed.get(AcousticContentClient);
    expect(service).toBeTruthy();
  });
});
