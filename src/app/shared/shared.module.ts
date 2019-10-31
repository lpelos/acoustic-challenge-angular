import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArticleComponent,
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,
    // Components
    ArticleComponent,
  ]
})
export class SharedModule { }
