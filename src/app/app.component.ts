import { Component } from '@angular/core';

import { ArticleParams } from './core/content-service/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  articleParams: ArticleParams;

  onSubmitArticleParams(params: ArticleParams): void {
    this.articleParams = params;
  }
}
