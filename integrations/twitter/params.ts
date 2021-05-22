import * as _ from 'lodash';
import { ITwitterParams, TwitterQueryOperator, TwitterFiliter } from '../interface';

export class TwitterParams implements ITwitterParams {
  private hashtags: HashTag[] = [];
  private filter: TwitterFiliter = TwitterFiliter.UNFILTERED;

  toHash(): { [key: string]: string } {
    if (this.hashtags.length === 0 && this.filter == TwitterFiliter.UNFILTERED) {
      return {};
    }

    const strs: string[] = [];
    if (this.toHashtagString() != '') {
      strs.push(this.toHashtagString());
    }

    if (this.filter != TwitterFiliter.UNFILTERED) {
      strs.push(`filter:${this.filter}`);
    }

    return { q: strs.join(' ') };
  }

  reset() {
    this.hashtags = [];
    this.filter = TwitterFiliter.UNFILTERED;
  }

  initializeHashtaGroup(tag: string): TwitterParams {
    this.hashtags.push(HashTag.createTagOnly(tag));
    return this;
  }

  addHashTag(tag: string, operator: TwitterQueryOperator): TwitterParams {
    const hashtag = HashTag.createWithOperator(tag, operator);
    this.hashtags.push(hashtag);

    return this;
  }

  addFilter(filter: TwitterFiliter): TwitterParams {
    this.filter = filter;
    return this;
  }

  private toHashtagString(): string {
    if (this.hashtags.length === 0) {
      return '';
    }

    let strs: string[] = [];
    strs.push(`#${this.hashtags[0].tag}`);

    if (this.hashtags.length > 1) {
      _.each(this.hashtags.slice(1), function (hashtag: HashTag) {
        strs.push(`${hashtag.operator} #${hashtag.tag}`);
      });
    }

    const query = strs.join(' ');
    return `(${query})`;
  }
}

class HashTag {
  tag: string;
  operator: string;

  public static createWithOperator(tag: string, operator: TwitterQueryOperator): HashTag {
    const hastag = new HashTag();
    hastag.tag = tag;
    hastag.operator = operator;
    return hastag;
  }

  public static createTagOnly(tag: string): HashTag {
    const hastag = new HashTag();
    hastag.tag = tag;
    return hastag;
  }
}
