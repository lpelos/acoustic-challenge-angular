interface ArticleAttributes {
  author?: string;
  body?: string;
  date?: string;
  heading?: string;
  id?: string;
  mainImage?: any; // TODO: fix type
}

export class Article implements ArticleAttributes {
  author: string;
  body: string;
  date: string;
  heading: string;
  id: string;
  mainImage: any; // TODO: fix type

  constructor(attr: ArticleAttributes) {
    this.author = attr.author;
    this.body = attr.body;
    this.date = attr.date;
    this.heading = attr.heading;
    this.id = attr.id;
    this.mainImage = attr.mainImage;
  }
}
