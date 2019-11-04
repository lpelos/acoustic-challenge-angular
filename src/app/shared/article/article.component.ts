import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AcousticContentNotFoundError } from 'src/app/core/acoustic-content-client/acoustic-content.client';
import { Article } from 'src/app/core/models/article.model';
import { ArticleParams, ArticleService } from 'src/app/core/article-service/article.service';

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

    if (!this.params) { return; }

    const { contentHubId, contentId } = this.params;

    this.subscription = this.articleService.find({ contentHubId, contentId })
      .pipe(catchError(err => this.handleError(err)))
      .subscribe(article => {
        if (article) { this.article = article; }
        this.isLoading = false;
      });
  }

  private handleError(err: any): Observable<null> {
    if (err instanceof AcousticContentNotFoundError) {
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
