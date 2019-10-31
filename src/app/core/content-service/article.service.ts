import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AcousticContentClient } from '../acoustic-content-client/acoustic-content.client';
import { Article } from '../models/article.model';
import { ArticleImage } from '../models/article-image.model';

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
    return this.client.contentItem(contentHubId, contentId)
      .pipe(map(json => this.articleFromJSON(json)));
  }

  private articleFromJSON(json: any): Article {
    if (!json) { return null; }

    const { elements, id } = json;
    const { author, body, date, heading, mainImage } = elements;

    return new Article({
      author: author.value || '',
      body: body.values || [],
      date: date.value || null,
      heading: heading.value || '',
      id,
      mainImage: this.articleImageFromJSON(mainImage),
    });
  }

  private articleImageFromJSON(json: any): ArticleImage {
    if (!json || !json.value) { return null; }

    const { leadImage, leadImageCaption, leadImageCredit } = json.value;
    const { url } = leadImage;

    return new ArticleImage({
      caption: leadImageCaption.value || '',
      credit: leadImageCredit.value || '',
      url: url ? this.client.resourceUrl(url) : '',
    });
  }
}
