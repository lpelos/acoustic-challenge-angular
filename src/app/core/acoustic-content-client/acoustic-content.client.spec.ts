import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AcousticContentClient } from './acoustic-content.client';
import mockContent from './content.mock';

describe('AcousticContentClient', () => {
  let service: AcousticContentClient;
  let httpTestingController: HttpTestingController;

  const mockContentHubId = '3dcf776b-6f21-47fa-839d-f741bc6652bb';
  const mockContentId = '60da4048-05f1-46ef-8f61-51cd88c2cc3b';

  // tslint:disable-next-line:max-line-length
  const mockContentUrl = 'https://my12.digitalexperience.ibm.com/api/3dcf776b-6f21-47fa-839d-f741bc6652bb/delivery/v1/content/60da4048-05f1-46ef-8f61-51cd88c2cc3b';

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

  describe('#contentItem', () => {
    it('should return an Observable of the content data', () => {
      service.contentItem(mockContentHubId, mockContentId).subscribe(content => {
        expect(content).toBeTruthy();
        expect(content.id).toEqual(mockContentId);
      });

      const req = httpTestingController.expectOne(mockContentUrl);
      req.flush(mockContent);
    });
  });

  describe('#contentItemUrl', () => {
    it('should return the content URL', () => {
      const url = service.contentItemUrl(mockContentHubId, mockContentId);
      expect(url).toEqual(mockContentUrl);
    });
  });

  describe('#resourceUrl', () => {
    it('should return the resource URL', () => {
      const mockResourcePath = '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg';
      // tslint:disable-next-line:max-line-length
      const mockResourceUrl = 'https://my12.digitalexperience.ibm.com/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg';
      const url = service.resourceUrl(mockResourcePath);
      expect(url).toEqual(mockResourceUrl);
    });
  });
});
