import { TwitterMediaType, ITwitterQuery } from '.';

export class TwitterQuery implements ITwitterQuery {
  private _hashtags: string[];
  private _mediaType: TwitterMediaType;
  private _isIncludeRT: boolean;

  constructor(hashtag: string) {
    this._hashtags = [`#${hashtag}`];
    this._mediaType = TwitterMediaType.UNSPECIFED_TYPE;
    this._isIncludeRT = false;
  }

  toQuery(): string {
    let strs: string[] = [...this._hashtags];
    strs = [...strs, 'has:hashtags'];

    if (this._mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      strs = [...strs, `has:${this._mediaType}`];
    }

    if (this._isIncludeRT === undefined || !this._isIncludeRT) {
      strs = [...strs, '-is:retweet'];
    }

    const query = strs.join(' ');
    return `(${query})`;
  }

  addHashtag(tag: string): ITwitterQuery {
    this._hashtags = [...this._hashtags, `#${tag}`];
    return this;
  }

  setIncldueRT(): ITwitterQuery {
    this._isIncludeRT = true;
    return this;
  }

  setMediaType(filter: TwitterMediaType): ITwitterQuery {
    this._mediaType = filter;
    return this;
  }

  hashtags(): string[] {
    return this._hashtags;
  }
}
