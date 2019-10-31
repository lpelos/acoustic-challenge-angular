import { ArticleImage } from './article-image.model';

interface ArticleAttributes {
  author?: string;
  body?: string[];
  date?: string;
  heading?: string;
  id?: string;
  mainImage?: ArticleImage;
}

export class Article implements ArticleAttributes {
  author: string;
  body: string[];
  date: string;
  heading: string;
  id: string;
  mainImage: ArticleImage;

  constructor({
    body = [],
    ...attr
  }: ArticleAttributes) {
    this.author = attr.author;
    this.body = body;
    this.date = attr.date;
    this.heading = attr.heading;
    this.id = attr.id;
    this.mainImage = attr.mainImage;
  }
}
