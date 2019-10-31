interface ArticleImageAttributes {
  caption?: string;
  credit?: string;
  url?: string;
}

export class ArticleImage implements ArticleImageAttributes {
  caption: string;
  credit: string;
  url: string;

  constructor(attr: ArticleImageAttributes) {
    this.caption = attr.caption;
    this.credit = attr.credit;
    this.url = attr.url;
  }
}
