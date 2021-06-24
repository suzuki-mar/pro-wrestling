import * as _ from 'lodash';
import { TwitterQueryOperator, TwitterFiliter, ITwitterHashtag, ITwitterParams } from './interface';

export class TwitterParams implements ITwitterParams {
  PAGES_PER_COUNT_MAX = 100;
  PAGES_PER_COUNT_DEFAULT = 10;

  private hashtags: ITwitterHashtag[] = [];
  private _filter: TwitterFiliter = TwitterFiliter.UNFILTERED;
  private _count: Number;
  private isIncludeRT: boolean = false;

  constructor() {
    this._count = this.PAGES_PER_COUNT_DEFAULT;
  }

  // FIX fileterはいらない
  toQuery(): string {
    const unconfiguredCondition =
      this.hashtags.length === 0 && this._filter === TwitterFiliter.UNFILTERED && this.isIncludeRT;

    if (unconfiguredCondition) {
      return '';
    }

    const strs: string[] = [];
    if (this.toHashtagString() !== '') {
      strs.push(this.toHashtagString());
    }

    if (this._filter !== TwitterFiliter.UNFILTERED) {
      strs.push(`filter:${this._filter}`);
    }

    if (!this.isIncludeRT) {
      strs.push('-filter:retweets');
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
    this.isIncludeRT = true;
    return this;
  }

  addHashTag(hashtag: ITwitterHashtag): ITwitterParams {
    this.hashtags.push(hashtag);
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

  private toHashtagString(): string {
    if (this.hashtags.length === 0) {
      return '';
    }

    let string = `(${this.hashtags[0]!.toString()})`;

    _.each(this.hashtags.slice(1), (hashtag: ITwitterHashtag) => {
      string += ` ${TwitterQueryOperator.OR} (${hashtag.toString()})`;
    });

    return string;
  }
}
