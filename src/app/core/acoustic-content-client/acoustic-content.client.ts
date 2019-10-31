import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

interface JSONResponse {
  [key: string]: any;
}

@Injectable()
export class AcousticContentClient {
  private readonly baseUrl = 'https://my12.digitalexperience.ibm.com/api/:apiKey/delivery/v1';

  constructor(
    protected http: HttpClient,
  ) { }

  contentItem(apiKey: string, contentId: string): Observable<JSONResponse> {
    return this.http.get(this.contentItemUrl(apiKey, contentId));
  }

  contentItemUrl(apiKey: string, contentId: string): string {
    return this.url(apiKey, `content/${contentId}`);
  }

  private url(apiKey: string, path = '/'): string {
    const base = this.baseUrl.replace(':apiKey', apiKey);
    return [base, path].join('/');
  }
}
