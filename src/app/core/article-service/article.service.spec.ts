import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AcousticContentClient } from '../acoustic-content-client/acoustic-content.client';
import { ArticleService } from './article.service';
import mockContent from '../acoustic-content-client/content.mock';

describe('ArticleService', () => {
  let service: ArticleService;
  let acousticContentClientSpy: jasmine.SpyObj<AcousticContentClient>;

  beforeEach(() => {
    const clientSpy = jasmine.createSpyObj('AcousticContentClient', ['contentItem', 'resourceUrl']);

    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        { provide: AcousticContentClient, useValue: clientSpy },
      ],
    });

    acousticContentClientSpy = TestBed.get(AcousticContentClient);
    service = TestBed.get(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#find', () => {
    it('should call the client and return an Article for the received content data', (done: DoneFn) => {
      const mockContentHubId = 'ed8f0be9-8d1d-42bf-b9d6-014669de9aef';
      const mockContentId = '966d4130-6365-4cda-ae54-0719e2edb076';
      const mockMainImageUrl = 'http://lorempixel.com/400/200/';

      const stubResp = of(mockContent);
      acousticContentClientSpy.contentItem.and.returnValue(stubResp);
      acousticContentClientSpy.resourceUrl.and.returnValue(mockMainImageUrl);

      service.find({
        contentHubId: mockContentHubId,
        contentId: mockContentId,
      }).subscribe(article => {
        expect(acousticContentClientSpy.contentItem.calls.count()).toBe(1);
        expect(acousticContentClientSpy.contentItem.calls.mostRecent().returnValue).toBe(stubResp);

        expect(article).toBeTruthy();
        expect(article.author).toEqual('Leeroy Jenkins');
        expect(article.body).toEqual(['<p>LEEEEEEEEEERROOOOOOOOOOY</p>', '<p>JEEENKINNNNSSSS</p>']);
        expect(article.date).toEqual(new Date('2009-04-30T13:05:00Z'));
        expect(article.heading).toEqual('YOLO');
        expect(article.id).toEqual('60da4048-05f1-46ef-8f61-51cd88c2cc3b');

        expect(article.mainImage).toBeTruthy();
        expect(article.mainImage.caption).toEqual('Rookery, Upper Blackrock Spire');
        expect(article.mainImage.credit).toEqual('the Internetz');
        expect(article.mainImage.url).toEqual(mockMainImageUrl);

        done();
      });

    });
  });
});
