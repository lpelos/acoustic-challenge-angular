import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AcousticContentClient } from '../acoustic-content-client/acoustic-content.client';
import { Article } from '../models/article.model';

export interface ArticleParams {
  contentHubId: string;
  contentId: string;
}

@Injectable()
export class ArticleService {
  constructor(
    protected client: AcousticContentClient,
  ) { }

  find({ contentHubId, contentId }: ArticleParams): Observable<Article> {
    return this.client.contentItem(contentHubId, contentId).pipe(map(json => this.fromJSON(json)));
  }

  private fromJSON(json: any): Article {
    if (!json) { return null; }

    const { elements, id } = json;
    const { author, body, date, heading, mainImage } = elements;

    return new Article({
      author: author.value || '',
      body: body.values || [],
      date: date.value || null,
      heading: heading.value || '',
      id,
      // TODO: parse mainImage URL
    });
  }
}
