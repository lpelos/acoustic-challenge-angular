import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ArticleParamsFormComponent } from './article-params-form.component';

describe('ArticleParamsFormComponent', () => {
  let comp: ArticleParamsFormComponent;
  let fixture: ComponentFixture<ArticleParamsFormComponent>;

  let formDe: DebugElement;
  let formEl: HTMLElement;

  let btnDe: DebugElement;
  let btnEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ArticleParamsFormComponent],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ArticleParamsFormComponent);
      comp = fixture.componentInstance;

      fixture.detectChanges();

      formDe = fixture.debugElement.query(By.css('form'));
      formEl = formDe.nativeElement;

      btnDe = fixture.debugElement.query(By.css('[type="submit"]'));
      btnEl = btnDe.nativeElement;
    });
  }));

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should build the form FormGroup', () => {
    expect(comp.form).toBeTruthy();
    expect(comp.form.get('contentHubId')).toBeTruthy();
    expect(comp.form.get('contentId')).toBeTruthy();
  });

  it('Content Hub ID field should be a valid UUID', () => {
    const control = comp.form.get('contentHubId');

    control.setValue('');
    expect(control.invalid).toBe(true);

    control.setValue('  ');
    expect(control.invalid).toBe(true);

    control.setValue('some random value');
    expect(control.invalid).toBe(true);

    control.setValue('1ddeb42e-2d64-423e-878b-c3cc50193629');
    expect(control.valid).toBe(true);
  });

  it('Content ID field should be a valid UUID', () => {
    const control = comp.form.get('contentId');

    control.setValue('');
    expect(control.invalid).toBe(true);

    control.setValue('  ');
    expect(control.invalid).toBe(true);

    control.setValue('some random value');
    expect(control.invalid).toBe(true);

    control.setValue('1ddeb42e-2d64-423e-878b-c3cc50193629');
    expect(control.valid).toBe(true);
  });

  it('should prevent submission of invalid form', () => {
    spyOn(comp, 'onSubmit');
    expect(comp.form.invalid).toBeTruthy();

    btnEl.click();

    expect(comp.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should submit if form is valid', () => {
    spyOn(comp, 'onSubmit');

    comp.form.setValue({
      contentHubId: '9f19ed00-a9e3-47a3-9e64-28a2c6e2c92b',
      contentId: '7ff9f624-6934-4a26-a269-6df7e3ef53fb',
    });
    expect(comp.form.valid).toBeTruthy();

    fixture.detectChanges();
    btnEl.click();

    expect(comp.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should mark fields as invalid', () => {
    spyOn(comp, 'isInvalid').and.returnValue(true);
    fixture.detectChanges();

    const contentHubIdDe = formDe.query(By.css('#contentHubIdInput'));
    const contentIdDe = formDe.query(By.css('#contentIdInput'));

    expect(contentHubIdDe.nativeElement).toHaveClass('is-invalid');
    expect(contentIdDe.nativeElement).toHaveClass('is-invalid');
  });

  it('should mark fields as valid', () => {
    spyOn(comp, 'isValid').and.returnValue(true);
    fixture.detectChanges();

    const contentHubIdDe = formDe.query(By.css('#contentHubIdInput'));
    const contentIdDe = formDe.query(By.css('#contentIdInput'));

    expect(contentHubIdDe.nativeElement).toHaveClass('is-valid');
    expect(contentIdDe.nativeElement).toHaveClass('is-valid');
  });

  it('should show invalid feedback', () => {
    const stubError = 'something wrong is not right';

    spyOn(comp, 'isInvalid').and.returnValue(true);
    spyOn(comp, 'errorMessage').and.returnValue(stubError);
    fixture.detectChanges();

    const contentHubIdDe = formDe.query(By.css('.invalid-feedback'));
    expect(contentHubIdDe.nativeElement.textContent.trim()).toBe(stubError);
  });

  it('should hide invalid feedback', () => {
    spyOn(comp, 'isInvalid').and.returnValue(false);
    fixture.detectChanges();

    const contentHubIdDe = formDe.query(By.css('.invalid-feedback'));
    expect(contentHubIdDe).toBeFalsy();
  });

  describe('#errorKey', () => {
    let control: FormControl;

    beforeEach(() => {
      control = comp.form.get('contentId') as FormControl;
    });

    it('should be null for valid controls', () => {
      control.setValue('78bedbd8-9e49-4ea6-ba80-bce7860ddf7a');
      expect(comp.errorKey('contentId')).toEqual(null);
    });

    it('should return one control error', () => {
      control.setValue('');
      expect(Object.keys(control.errors)).toContain(comp.errorKey('contentId'));
    });
  });

  describe('#errorMessage', () => {
    let control: FormControl;

    beforeEach(() => {
      control = comp.form.get('contentHubId') as FormControl;
    });

    it('should be null for valid controls', () => {
      control.setValue('f15e8f1c-75d7-4fc0-993e-7113f2a6c362');
      expect(comp.errorMessage('contentHubId')).toBeNull();
    });

    it('should return present error message', () => {
      control.setValue('');
      expect(comp.errorMessage('contentHubId')).toContain('cannot be blank');
    });

    it('should return present error message', () => {
      control.setValue('not a valid uuid');
      expect(comp.errorMessage('contentHubId')).toContain('invalid UUID');
    });
  });

  describe('#isInvalid', () => {
    let control: FormControl;

    beforeEach(() => {
      control = comp.form.get('contentId') as FormControl;
    });

    it('should be false for untouched controls', () => {
      control.setValue('');
      control.markAsUntouched();
      expect(comp.isInvalid('contentId')).toBe(false);
    });

    it('should be false for valid controls', () => {
      control.setValue('881e305a-905c-4aa1-b2dd-f2e863855dca');
      control.markAsTouched();
      expect(comp.isInvalid('contentId')).toBe(false);
    });

    it('should be true for invalid controls', () => {
      control.setValue('');
      control.markAsTouched();
      expect(comp.isInvalid('contentId')).toBe(true);
    });
  });

  describe('#isValid', () => {
    let control: FormControl;

    beforeEach(() => {
      control = comp.form.get('contentHubId') as FormControl;
    });

    it('should be false for untouched controls', () => {
      control.setValue('');
      control.markAsUntouched();
      expect(comp.isValid('contentHubId')).toBe(false);
    });

    it('should be false for invalid controls', () => {
      control.setValue('');
      control.markAsTouched();
      expect(comp.isValid('contentHubId')).toBe(false);
    });

    it('should be true for valid controls', () => {
      control.setValue('881e305a-905c-4aa1-b2dd-f2e863855dca');
      control.markAsTouched();
      expect(comp.isValid('contentHubId')).toBe(true);
    });
  });

  describe('#onSubmit', () => {
    it('should emit submission event', () => {
      spyOn(comp.formSubmit, 'emit');

      const formValue = {
        contentHubId: 'bf613fad-f566-4e1f-ae00-346e35798eca',
        contentId: '2e9c5e9f-3cf8-4c2e-a05f-ced2522a7bb2',
      };

      comp.form.setValue(formValue);
      expect(comp.form.valid).toBeTruthy();

      comp.onSubmit();

      expect(comp.formSubmit.emit).toHaveBeenCalledTimes(1);
      expect(comp.formSubmit.emit).toHaveBeenCalledWith(formValue);
    });
  });
});
