import { ITwitterHashtagQuery } from '..';
import { TwitterQuery } from './twitterQuery';

export class TwitterHashtagQuery extends TwitterQuery implements ITwitterHashtagQuery {
  private _hashtags: string[];

  constructor(hashtag: string) {
    super();
    this._hashtags = [`#${hashtag}`];
  }

  buildQueryByType(): string {
    let strs: string[] = [...this._hashtags];
    strs = [...strs, 'has:hashtags'];

    return strs.join(' ');
  }

  addHashtag(tag: string): ITwitterHashtagQuery {
    this._hashtags = [...this._hashtags, `#${tag}`];
    return this;
  }

  hashtags(): string[] {
    return this._hashtags;
  }
}
