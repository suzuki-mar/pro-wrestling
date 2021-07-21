import { TwitterQueryOperator, ITwitterHashtag } from '.';

// FIX Hashtagではなくクエリー
export class TwitterHashtag implements ITwitterHashtag {
  private currentString: string;

  toString(): string {
    return this.currentString;
  }

  addString(tag: string, operator: TwitterQueryOperator): ITwitterHashtag {
    this.currentString += ` ${operator} #${tag}`;
    return this;
  }

  initialize(tag: string): ITwitterHashtag {
    this.currentString = `#${tag}`;
    return this;
  }
}
