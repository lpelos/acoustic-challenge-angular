import { TestBed } from '@angular/core/testing';

import { AcousticContentClient } from '../acoustic-content-client/acoustic-content.client';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  const acousticContentClientSpy = jasmine.createSpyObj('AcousticContentClient', ['contentItem']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ArticleService,
      { provide: AcousticContentClient, userValue: acousticContentClientSpy },
    ],
  }));

  it('should be created', () => {
    const service: ArticleService = TestBed.get(ArticleService);
    expect(service).toBeTruthy();
  });
});
