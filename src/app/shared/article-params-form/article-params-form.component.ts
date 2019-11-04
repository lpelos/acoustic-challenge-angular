import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AppValidators } from 'src/app/core/utils/app-validators';
import { ArticleParams } from 'src/app/core/article-service/article.service';

@Component({
  selector: 'app-article-params-form',
  templateUrl: './article-params-form.component.html',
  styleUrls: ['./article-params-form.component.scss']
})
export class ArticleParamsFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<ArticleParams>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  errorKey(controlName: string): string {
    const control = this.getControl(controlName);
    return control.errors ? Object.keys(control.errors)[0] : null;
  }

  errorMessage(controlName: string): string {
    const errorKey = this.errorKey(controlName);

    switch (errorKey) {
      case 'present': return 'cannot be blank';
      case 'uuid': return 'invalid UUID';
      default: return null;
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return Boolean(control && control.touched && control.invalid);
  }

  isValid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return Boolean(control && control.touched && control.valid);
  }

  onSubmit(): void {
    if (!this.form.valid) { return; }

    const { value } = this.form;
    const contentHubId = value.contentHubId && value.contentHubId.trim();
    const contentId = value.contentId && value.contentId.trim();

    this.formSubmit.emit({ contentHubId, contentId });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      contentHubId: ['', [AppValidators.present, AppValidators.uuid]],
      contentId: ['', [AppValidators.present, AppValidators.uuid]],
    });
  }

  private getControl(controlName: string): FormControl {
    return this.form && this.form.get(controlName) as FormControl;
  }
}
