import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

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

  @Output() closeArticle = new EventEmitter<void>();

  article: Article;
  isLoading = false;
  notFoundError = false;
  unexpectedError = false;

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

  onClose(): void {
    this.closeArticle.emit();
  }

  private fetchArticle(): void {
    this.unsubscribe();

    this.article = null;
    this.isLoading = true;
    this.notFoundError = false;
    this.unexpectedError = false;

    const { apiKey, contentId } = this.params;

    this.subscription = this.articleService.find({ apiKey, contentId })
      .pipe(catchError(err => this.handleError(err)))
      .subscribe(article => {
        if (article) { this.article = article; }
        this.isLoading = false;
      });
  }

  private handleError(err: any): Observable<null> {
    const status = err && err.status;

    if (status === 404) {
      this.notFoundError = true;
    } else {
      this.unexpectedError = true;
    }

    return of(null);
  }

  private unsubscribe(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
