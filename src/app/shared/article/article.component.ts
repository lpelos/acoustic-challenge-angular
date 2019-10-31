import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from 'src/app/core/models/article.model';
import { ArticleParams, ArticleService } from 'src/app/core/content-service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnChanges, OnDestroy {
  @Input() params: ArticleParams;

  article: Article;
  fetchError = false;
  isLoading = false;

  private subscription: Subscription;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.params) { this.fetchArticle(); }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private fetchArticle(): void {
    this.unsubscribe();

    this.isLoading = true;
    this.article = null;
    this.fetchError = false;

    const { apiKey, contentId } = this.params;

    this.subscription = this.articleService.find({ apiKey, contentId })
      .pipe(catchError(err => this.handleError(err)))
      .subscribe(article => {
        if (article) { this.article = article; }
        this.isLoading = false;
      });
  }

  private handleError(err: any): Observable<null> {
    this.fetchError = true;
    return of(null);
  }

  private unsubscribe(): void {
    if (this.subscription) { this.unsubscribe(); }
  }
}
