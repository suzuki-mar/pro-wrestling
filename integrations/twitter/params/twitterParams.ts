import { TwitterMediaType, ITwitterParams } from '..';
import { Tweetv2SearchParams } from 'twitter-api-v2';
import moment from 'moment';
import { TwitterParamsV2Support } from './twitterParamsV2Support';

export class TwitterParams implements ITwitterParams {
  PAGES_PER_COUNT_MAX = 100;
  PAGES_PER_COUNT_DEFAULT = 10;

  private _mediaType: TwitterMediaType = TwitterMediaType.UNSPECIFED_TYPE;
  private _count: Number;
  private _startTimeStr: string;

  toHash(): Partial<Tweetv2SearchParams> {
    const v2Support = new TwitterParamsV2Support();

    let params = v2Support.buildParams(this._mediaType);

    if (this._count !== undefined) {
      params = Object.assign(params, { max_results: this.count() });
    }

    if (this._startTimeStr !== undefined) {
      params = Object.assign(params, { start_time: this._startTimeStr });
    }

    return params;
  }

  count(): Number {
    return this._count;
  }

  mediaType(): TwitterMediaType {
    return this._mediaType;
  }

  setMediaType(filter: TwitterMediaType): ITwitterParams {
    this._mediaType = filter;
    return this;
  }

  setCount(count: Number): ITwitterParams {
    if (count < 10 && count > 101) {
      throw new Error('カウントは10から100までの指定になります');
    }

    this._count = count;
    return this;
  }

  setStartTime(date: Date): ITwitterParams {
    this._startTimeStr = moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
    return this;
  }

  setCountMax(): ITwitterParams {
    this._count = this.PAGES_PER_COUNT_MAX;
    return this;
  }
}
