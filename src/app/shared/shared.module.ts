import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleComponent } from './article/article.component';
import { ArticleParamsFormComponent } from './article-params-form/article-params-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ArticleComponent,
    ArticleParamsFormComponent,
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    // Components
    ArticleComponent,
    ArticleParamsFormComponent,
  ],
})
export class SharedModule { }
