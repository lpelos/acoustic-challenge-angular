import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AcousticContentClient } from 'src/app/core/acoustic-content-client/acoustic-content.client';
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
    private acousticContentClient: AcousticContentClient,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.setExampleUrl();
  }

  onSubmit(): void {
    if (!this.form.valid) { return; }

    const { value } = this.form;
    const apiKey = value.apiKey && value.apiKey.trim();
    const contentId = value.contentId && value.contentId.trim();

    this.formSubmit.emit({ apiKey, contentId });
  }

  private buildForm(): void {
    // TODO: intialize form with empty values
    this.form = this.fb.group({
      apiKey: ['859f2008-a40a-4b92-afd0-24bb44d10124', AppValidators.present],
      contentId: ['fa9519d5-0363-4b8d-8e1f-627d802c08a8', AppValidators.present],
    });
  }

  private setExampleUrl(): void {
    this.exampleUrl = this.acousticContentClient.contentItemUrl('<API Key>', '<Content ID>');
  }
}
