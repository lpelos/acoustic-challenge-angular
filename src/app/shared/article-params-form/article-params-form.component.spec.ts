import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleParamsFormComponent } from './article-params-form.component';

describe('ArticleParamsFormComponent', () => {
  let component: ArticleParamsFormComponent;
  let fixture: ComponentFixture<ArticleParamsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleParamsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleParamsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
