import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AcousticContentClient } from './acoustic-content-client/acoustic-content.client';
import { ArticleService } from './article-service/article.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AcousticContentClient,
    ArticleService,
  ],
})
export class CoreModule { }
