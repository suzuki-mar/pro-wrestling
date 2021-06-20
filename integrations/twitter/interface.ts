export type TTweetBase = {
  id: Number;
  text: string;
  type: TweetType;
  hashtags: string[];
};

export type TTextOnlyTweet = TTweetBase;

export type TPictureTweet = TTweetBase & { pictureURL: string };
export type TTweet = TPictureTweet | TTextOnlyTweet;

export enum TweetType {
  TextOnly = 'TextOnly',
  Picture = 'Picture',
  Unknown = 'Unknown',
}

export enum TwitterQueryOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum TwitterFiliter {
  IMAGES = 'images',
  // ツイッターの画像が含まれるツイート
  TWIMG = 'twimg',
  VIDEOS = 'videos',
  MEDIA = 'media',
  UNFILTERED = '',
}

export interface ITwitter {
  search(params: ITwitterParams): Promise<TTweet[]>;
}

export interface ITwitterParams {
  toQuery(): string;
  filter(): TwitterFiliter;
  count(): Number;
  addHashTag(hashTag: ITwitterHashtag): ITwitterParams;
  addFilter(filter: TwitterFiliter): ITwitterParams;
  addCountMax(): ITwitterParams;
  addCount(count: Number): ITwitterParams;
}

export interface ITwitterHashtag {
  toString(): string;
  addString(tag: string, operator: TwitterQueryOperator): ITwitterHashtag;
  initialize(tag: string): ITwitterHashtag;
}
