import { TwitterMediaType, ITwitterParams } from '.';
import {
  TTweetv2Expansion,
  TTweetv2MediaField,
  TTweetv2TweetField,
  TTweetv2UserField,
  Tweetv2SearchParams,
} from 'twitter-api-v2';
import moment from 'moment';

export class TwitterParams implements ITwitterParams {
  PAGES_PER_COUNT_MAX = 100;
  PAGES_PER_COUNT_DEFAULT = 10;

  private _mediaType: TwitterMediaType = TwitterMediaType.UNSPECIFED_TYPE;
  private _count: Number;
  private _startTimeStr: string;

  toHash(): Partial<Tweetv2SearchParams> {
    let params: Partial<Tweetv2SearchParams> = {
      'tweet.fields': this.tweetFileds(),
      expansions: this.expansions(),
      'user.fields': this.userFileds(),
    };

    if (this._mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      params = Object.assign(params, { 'media.fields': this.mediaFileds() });
    }

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

  private expansions(): TTweetv2Expansion[] {
    let data: TTweetv2Expansion[] = ['author_id', 'entities.mentions.username'];

    if (this._mediaType !== TwitterMediaType.UNSPECIFED_TYPE) {
      data = [...data, 'attachments.media_keys'];
    }

    return data;
  }

  private mediaFileds(): TTweetv2MediaField[] {
    return ['media_key', 'type', 'url'];
  }

  private tweetFileds(): TTweetv2TweetField[] {
    return ['entities', 'created_at', 'author_id'];
  }

  private userFileds(): TTweetv2UserField[] {
    return ['entities'];
  }
}
