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
    const url = this.url(apiKey, `content/${contentId}`);
    return this.http.get(url);
  }

  private url(apiKey: string, path = '/'): string {
    const base = this.baseUrl.replace(':apiKey', apiKey);
    return [base, path].join('/');
  }
}
