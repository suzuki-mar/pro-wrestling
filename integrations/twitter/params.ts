import * as _ from 'lodash';
import { TwitterQueryOperator, TwitterFiliter, ITwitterHashtag, ITwitterParams } from '.';

export class TwitterParams implements ITwitterParams {
  PAGES_PER_COUNT_MAX = 100;
  PAGES_PER_COUNT_DEFAULT = 10;

  private _hashtags: ITwitterHashtag[] = [];
  private _filter: TwitterFiliter = TwitterFiliter.UNFILTERED;
  private _count: Number;
  private _isIncludeRT: boolean = false;

  constructor() {
    this._count = this.PAGES_PER_COUNT_DEFAULT;
  }

  // FIX fileterはいらない
  toQuery(): string {
    const unconfiguredCondition =
      this._hashtags.length === 0 &&
      this._filter === TwitterFiliter.UNFILTERED &&
      this._isIncludeRT;

    if (unconfiguredCondition) {
      return '';
    }

    let strs: string[] = [];
    if (this.toHashtagString() !== '') {
      strs = [...strs, this.toHashtagString()];
    }

    if (this._filter !== TwitterFiliter.UNFILTERED) {
      strs = [...strs, `filter:${this._filter}`];
    }

    if (!this._isIncludeRT) {
      strs = [...strs, '-filter:retweets'];
    }

    return strs.join(' ');
  }

  count(): Number {
    return this._count;
  }

  filter(): TwitterFiliter {
    return this._filter;
  }

  setIncldueRT(): ITwitterParams {
    this._isIncludeRT = true;
    return this;
  }

  addHashTag(hashtag: ITwitterHashtag): ITwitterParams {
    this._hashtags = [...this._hashtags, hashtag];
    return this;
  }

  addFilter(filter: TwitterFiliter): ITwitterParams {
    this._filter = filter;
    return this;
  }

  addCount(count: Number): ITwitterParams {
    this._count = count;
    return this;
  }

  setCountMax(): ITwitterParams {
    this._count = this.PAGES_PER_COUNT_MAX;
    return this;
  }

  hashtags(): ITwitterHashtag[] {
    return this._hashtags;
  }

  private toHashtagString(): string {
    if (this._hashtags.length === 0) {
      return '';
    }

    let string = `(${this._hashtags[0]!.toString()})`;

    _.each(this._hashtags.slice(1), (hashtag: ITwitterHashtag) => {
      string += ` ${TwitterQueryOperator.OR} (${hashtag.toString()})`;
    });

    return string;
  }
}
