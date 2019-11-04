import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface JSONResponse {
  [key: string]: any;
}

export class AcousticContentNotFoundError extends Error { }
export class AcousticContentUnexpectedError extends Error { }

@Injectable()
export class AcousticContentClient {
  private readonly apiScope = 'api';
  private readonly apiVersion = 'v1';
  private readonly baseUrl = 'https://my12.digitalexperience.ibm.com';

  constructor(
    protected http: HttpClient,
  ) { }

  contentItem(contentHubId: string, contentId: string): Observable<JSONResponse> {
    const url = this.contentItemUrl(contentHubId, contentId);
    return this.http.get(url).pipe(
      catchError(err => {
        const status = err && err.status;

        switch (status) {
          case 404: return throwError(new AcousticContentNotFoundError());
          default: return throwError(new AcousticContentUnexpectedError());
        }
      }),
    );
  }

  contentItemUrl(contentHubId: string, contentId: string): string {
    return this.apiUrl([contentHubId, 'delivery', this.apiVersion, 'content', contentId]);
  }

  resourceUrl(resourceUrl: string): string {
    return this.url([resourceUrl]);
  }

  private apiUrl(components: string[] = []): string {
    return this.url([this.apiScope, ...components]);
  }

  private joinUrl(components: string[]): string {
    return components.filter(Boolean).map((c, i) => {
      return i === 0 ? this.stripAfterSlash(c) : this.stripTrailingSlashes(c);
    }).join('/');
  }

  private stripAfterSlash(str: string): string {
    return str.replace(/\/$/, '');
  }

  private stripTrailingSlashes(str: string): string {
    return this.stripAfterSlash(str).replace(/^\//, '');
  }

  private url(components: string[] = []): string {
    return this.joinUrl([this.baseUrl, ...components]);
  }
}
