import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
      ],
      declarations: [AppComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should start with empty params', () => {
    expect(comp.articleParams).toBeFalsy();
  });

  it('should show form when params is empty', () => {
    comp.articleParams = null;
    fixture.detectChanges();

    const formDe = fixture.debugElement.query(By.css('app-article-params-form'));
    expect(formDe).not.toBeNull();

    const artDe = fixture.debugElement.query(By.css('app-article'));
    expect(artDe).toBeNull();
  });

  it('should show article when there are params', () => {
    comp.articleParams = {
      contentHubId: '4a781d92-8351-4c8c-b18a-74849b7ad468',
      contentId: '18234d8b-3b71-4760-adb4-9512a2c186d4',
    };

    fixture.detectChanges();

    const formDe = fixture.debugElement.query(By.css('app-article-params-form'));
    expect(formDe).toBeNull();

    const artDe = fixture.debugElement.query(By.css('app-article'));
    expect(artDe).not.toBeNull();
  });

  it('should receive form submission event', () => {
    spyOn(comp, 'onSubmitArticleParams');

    const mockParams = {
      contentHubId: '53bbfe02-4023-4743-ba6f-646a510d6a3c',
      contentId: '99bfed70-d450-4355-9a92-a8126df5e3f8',
    };

    const formDe = fixture.debugElement.query(By.css('app-article-params-form'));
    formDe.componentInstance.formSubmit.emit(mockParams);

    expect(comp.onSubmitArticleParams).toHaveBeenCalledTimes(1);
    expect(comp.onSubmitArticleParams).toHaveBeenCalledWith(mockParams);
  });

  it('should receive article closing event', () => {
    spyOn(comp, 'onCloseArticle');

    comp.articleParams = {
      contentHubId: 'b05541cd-ffbd-4105-85a4-9b4f75c44bc8',
      contentId: '5e42cff3-8add-4d17-8dbd-a0fe05328a7e',
    };

    fixture.detectChanges();

    const artDe = fixture.debugElement.query(By.css('app-article'));
    artDe.componentInstance.closeArticle.emit();

    expect(comp.onCloseArticle).toHaveBeenCalledTimes(1);
  });

  it('should cache receive form params', () => {
    const mockParams = {
      contentHubId: '8407ca6f-95a5-4123-aada-2fa471b5a793',
      contentId: '555e6330-b848-4320-8bc5-19097ad48e7b',
    };

    comp.onSubmitArticleParams(mockParams);
    expect(comp.articleParams).toEqual(mockParams);
  });

  it('should clean article params', () => {
    comp.articleParams = {
      contentHubId: 'c590da3e-ee90-4a93-807e-e59c1079db20',
      contentId: '2cf1a5ba-8787-4d05-a9b6-a2d6a66de503',
    };

    comp.onCloseArticle();
    expect(comp.articleParams).toBeNull();
  });
});
