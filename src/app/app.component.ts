import { Component } from '@angular/core';

import { ArticleParams } from './core/content-service/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // TODO: get article params from form
  readonly articleParams: ArticleParams = {
    apiKey: '859f2008-a40a-4b92-afd0-24bb44d10124',
    contentId: 'fa9519d5-0363-4b8d-8e1f-627d802c08a8',
  };
}
