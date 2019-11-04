import { SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of, throwError } from 'rxjs';

import {
  AcousticContentNotFoundError,
  AcousticContentUnexpectedError,
} from 'src/app/core/acoustic-content-client/acoustic-content.client';
import { Article } from 'src/app/core/models/article.model';
import { ArticleComponent } from './article.component';
import { ArticleImage } from 'src/app/core/models/article-image.model';
import { ArticleService } from 'src/app/core/article-service/article.service';

describe('ArticleComponent', () => {
  let comp: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  const mockParams = {
    contentHubId: '73c62a8f-06c5-4e95-a23c-b7ec0c9e428e',
    contentId: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
  };

  const mockArticle = new Article({
    author: 'Leeroy Jenkins',
    body: ['<p>LEEEEEEEEEERROOOOOOOOOOY</p>', '<p>JEEENKINNNNSSSS</p>'],
    date: new Date('2009-04-30T13:05:00Z'),
    heading: 'YOLO',
    id: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
    mainImage: new ArticleImage({
      caption: 'Rookery, Upper Blackrock Spire',
      credit: 'the Internetz',
      url: 'http://lorempixel.com/400/200/',
    }),
  });

  beforeEach(async(() => {
    const serviceSpy = jasmine.createSpyObj('ArticleService', ['find']);

    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      providers: [
        { provide: ArticleService, useValue: serviceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    articleServiceSpy = TestBed.get(ArticleService);

    fixture = TestBed.createComponent(ArticleComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('#ngOnChanges', () => {
    let mockChanges: SimpleChanges;

    beforeEach(() => {
      comp.params = mockParams;
      mockChanges = { params: new SimpleChange(null, mockParams, true) };
    });

    it('should fetch an Article', () => {
      const stubResp = of(mockArticle);
      articleServiceSpy.find.withArgs(mockParams).and.returnValue(stubResp);

      comp.ngOnChanges(mockChanges);
      fixture.detectChanges();

      expect(articleServiceSpy.find.calls.count()).toBe(1);
      expect(articleServiceSpy.find.calls.mostRecent().returnValue).toBe(stubResp);

      expect(comp.article).toEqual(mockArticle);

      const headingDe = fixture.debugElement.query(By.css('h1'));
      expect(headingDe.nativeElement.textContent.trim()).toBe(mockArticle.heading);

      const authorDe = fixture.debugElement.query(By.css('.author'));
      expect(authorDe.nativeElement.textContent.trim()).toBe(mockArticle.author);

      const dateDe = fixture.debugElement.query(By.css('.date'));
      expect(dateDe.nativeElement.textContent.trim()).toBe('Apr 30, 2009, 1:05:00 PM');

      const figureDe = fixture.debugElement.query(By.css('.figure'));
      const { mainImage } = mockArticle;

      const imageDe = figureDe.query(By.css('img'));
      expect(imageDe.nativeElement.alt).toBe(mainImage.caption);
      expect(imageDe.nativeElement.src).toBe(mainImage.url);

      const captionDe = figureDe.query(By.css('figcaption'));
      expect(captionDe.nativeElement.textContent.trim()).toBe(mainImage.caption);

      const creditDe = figureDe.query(By.css('.credit'));
      expect(creditDe.nativeElement.textContent.trim()).toBe(mainImage.credit);

      fixture.debugElement.queryAll(By.css('.body section')).forEach((de, i) => {
        expect(de.properties.innerHTML).toContain(mockArticle.body[i]);
      });
    });

    it('should show 404 error', () => {
      const stubResp = throwError(new AcousticContentNotFoundError());
      articleServiceSpy.find.withArgs(mockParams).and.returnValue(stubResp);

      comp.ngOnChanges(mockChanges);
      fixture.detectChanges();

      expect(comp.notFoundError).toBe(true);

      const creditDe = fixture.debugElement.query(By.css('.not-found-error'));
      expect(creditDe.nativeElement).toBeTruthy();
    });

    it('should show unexpected error', () => {
      const stubResp = throwError(new AcousticContentUnexpectedError());
      articleServiceSpy.find.withArgs(mockParams).and.returnValue(stubResp);

      comp.ngOnChanges(mockChanges);
      fixture.detectChanges();

      expect(comp.unexpectedError).toBe(true);

      const creditDe = fixture.debugElement.query(By.css('.unexpected-error'));
      expect(creditDe.nativeElement).toBeTruthy();
    });
  });
});
