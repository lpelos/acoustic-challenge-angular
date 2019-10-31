import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

interface JSONResponse {
  [key: string]: any;
}

@Injectable()
export class AcousticContentClient {
  private readonly apiBaseUrl = 'https://my12.digitalexperience.ibm.com/api';
  private readonly apiVersion = 'v1';
  private readonly contentPath = '/:contentHubId/delivery/:apiVersion/content/:contentId';

  constructor(
    protected http: HttpClient,
  ) { }

  contentItem(contentHubId: string, contentId: string): Observable<JSONResponse> {
    const url = this.contentItemUrl(contentHubId, contentId);
    return this.http.get(url);
  }

  private contentItemUrl(contentHubId: string, contentId: string): string {
    const path = this.contentPath
      .replace(':contentHubId', contentHubId)
      .replace(':apiVersion', this.apiVersion)
      .replace(':contentId', contentId);

    return this.url(path);
  }

  private url(path = '/'): string {
    return [this.apiBaseUrl, path].join('/');
  }
}
