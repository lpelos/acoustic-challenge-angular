import { Component, OnInit } from '@angular/core';

import { Article } from './core/models/article.model';
import { ArticleService } from './core/content-service/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  article: Article;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    // TODO: get apiKey and contentId from form
    const apiKey = '859f2008-a40a-4b92-afd0-24bb44d10124';
    const contentId = 'fa9519d5-0363-4b8d-8e1f-627d802c08a8';

    this.articleService.find(apiKey, contentId).subscribe(article => {
      this.article = article;
    });
  }
}
