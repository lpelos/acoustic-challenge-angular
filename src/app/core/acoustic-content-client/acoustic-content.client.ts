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

  private join(components: string[]): string {
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

  private url(apiKey: string, path = '/'): string {
    return this.join([
      this.baseUrl.replace(':apiKey', apiKey),
      path,
    ]);
  }
}
