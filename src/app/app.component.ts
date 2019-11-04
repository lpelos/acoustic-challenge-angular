import { Component } from '@angular/core';

import { ArticleParams } from './core/article-service/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  articleParams: ArticleParams;

  onCloseArticle(): void {
    this.articleParams = null;
  }

  onSubmitArticleParams(params: ArticleParams): void {
    this.articleParams = params;
  }
}
