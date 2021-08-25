import { ITwitterQuery, TwitterMediaType } from '..';

// 頻繁にメソッドが変更されるため移譲ではなく継承をさせている
export abstract class TwitterQuery implements ITwitterQuery {
  private _mediaType: TwitterMediaType;
  private _isIncludeRT: boolean;

  constructor() {
    this._mediaType = TwitterMediaType.UNSPECIFED_TYPE;
    this._isIncludeRT = false;
  }

  abstract buildQueryByType(): string;

  toQuery(): string {
    let strs: string[] = [];

    if (this._mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      strs = [...strs, `has:${this._mediaType}`];
    }

    if (this._isIncludeRT === undefined || !this._isIncludeRT) {
      strs = [...strs, '-is:retweet'];
    }

    return this.buildQueryByType() + ' ' + strs.join(' ');
  }

  setIncldueRT(): ITwitterQuery {
    this._isIncludeRT = true;
    return this;
  }

  setMediaType(mediaType: TwitterMediaType): ITwitterQuery {
    this._mediaType = mediaType;
    return this;
  }
}
