import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AppValidators } from 'src/app/core/utils/app-validators';
import { ArticleParams } from 'src/app/core/content-service/article.service';

@Component({
  selector: 'app-article-params-form',
  templateUrl: './article-params-form.component.html',
  styleUrls: ['./article-params-form.component.scss']
})
export class ArticleParamsFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<ArticleParams>();

  form: FormGroup;
  exampleUrl: string;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit(): void {
    if (!this.form.valid) { return; }

    const { value } = this.form;
    const contentHubId = value.contentHubId && value.contentHubId.trim();
    const contentId = value.contentId && value.contentId.trim();

    this.formSubmit.emit({ contentHubId, contentId });
  }

  private buildForm(): void {
    // TODO: intialize form with empty values
    this.form = this.fb.group({
      contentHubId: ['859f2008-a40a-4b92-afd0-24bb44d10124', AppValidators.present],
      contentId: ['a9eabd0d-9b1d-4801-b686-0815860d9521', AppValidators.present],
    });
  }
}
